import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/configs';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailModule,
    JwtModule.register(configService.jwt),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
