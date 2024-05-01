import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class registerDTO {
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}