import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
