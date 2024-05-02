import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { registerDTO } from './dto/register.dto';
import { loginDTO } from './dto/login.dto';
import { requestResetPasswordDTO, resetPasswordDTO } from './dto/reset-password.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() payload: registerDTO) {
    return this.userService.register(payload);
  }

  @Post('login')
  login(@Body() payload: loginDTO, @Res() res: Response) {
    return this.userService.login(payload, res);
  }

  @Post('request-reset-password')
  requestResetPassword(@Body() payload: requestResetPasswordDTO) {
    return this.userService.requestPasswordReset(payload);
  }

  @Post('reset-password')
  resetPassword(@Body() payload: resetPasswordDTO) {
    return this.userService.resetPassword(payload);
  }
}
