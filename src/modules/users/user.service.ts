import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { registerDTO } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'src/utils/bcrypt.util';
import { loginDTO } from './dto/login.dto';
import { requestResetPasswordDTO, resetPasswordDTO } from './dto/reset-password.dto';
import { MailDataRequired } from '@sendgrid/mail';
import { Response } from 'express';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ){}

  async register(payload: registerDTO) {
    const exist = await this.checkIfUserExist(payload.email);
    if (exist) throw new BadRequestException('email already registered');
    const newUser: Partial<User> = {
      lastName: payload.lastName,
      firstName: payload.firstName,
      email: payload.email,
      password: await hashPassword(payload.password),
    };
    await this.userRepository.save(newUser).catch(e => {
      Logger.error(e);
      throw new InternalServerErrorException(e);
    });
    return {
      status: 'ok',
      message: 'successfully registered, please login to continue',
    }
  }

  async login(payload: loginDTO, res: Response) {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      }
    });
    const validPassword = await comparePassword(payload.password, user?.password);
    if (!validPassword || !user) throw new BadRequestException('invalid email / password');
    res.cookie('access_token', this.jwtService.sign({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }), {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.send({
      status: 'ok',
      message: 'login successfull',
    })
  }

  async requestPasswordReset(payload: requestResetPasswordDTO) {
    const exist = await this.userRepository.findOne({
      where: {
        email: payload.email,
      }
    });
    if (!exist) throw new NotFoundException('no user found with this email');
    const email: MailDataRequired = {
      to: 'putranto.restu@jitera.com',
      from: 'putranto.restu@jitera.com',
      subject: 'reset password',
      html:`
      <div>
          <h1>Password Reset</h1>
          <p>Hello ${exist.lastName},</p>
          <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
          <p>To reset your password, please click the button below:</p>
          <p><a href="http://localhost:8080/user/${exist.id}" class="btn">Reset Password</a></p>
          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The Jitera Team</p>
      </div>`
    };
    await this.emailService.sendMail(email);
    return {
      status: 'ok',
      message: `please check your email (${payload.email}) for reset link`,
    }
  }

  async resetPassword(payload: resetPasswordDTO) {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      }
    });
    user.password = await hashPassword(payload.password);
    await this.userRepository.save(user).catch(e => {
      Logger.error(e);
      throw new InternalServerErrorException(e);
    });
    return {
      status: 'ok',
      message: 'password changed sucessfull',
    }
  }

  async checkIfUserExist(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email
      },
      select: ['id'],
    });
    if (!user) return false;
    return true;
  }s
}
