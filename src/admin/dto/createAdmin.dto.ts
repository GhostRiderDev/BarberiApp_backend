import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {

  /**
   * @example 'Juan'
   * @description Nombre del administrador
   */
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  /**
   * @example 'some@gmail.om'
   * @description Correo electrónico del administrador
   */
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  /**
   * @example 'password123'
   * @description Contraseña del administrador
   * @default 'password123'
   * @minLength 8
   * @maxLength 50
   * @pattern (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}
   * @example 'password123
   */
  @IsNotEmpty()
  readonly password: string;
}
