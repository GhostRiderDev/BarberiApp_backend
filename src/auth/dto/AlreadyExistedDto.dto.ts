import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AlreadyExistedDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
