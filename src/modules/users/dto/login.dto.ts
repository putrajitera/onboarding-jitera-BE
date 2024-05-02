import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDTO {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}