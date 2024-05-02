import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class requestResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class resetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}