import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"


export class CreateUserDto {


    /**
     * @example 'example@gmail.com'
     * @description Correo electrónico del usuario
     * 
     */

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    /**
     * @example 'Juan'
     * @description Nombre del usuario
     */

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    readonly name: string

    /**
     * @example '3234668**'
     * @description Teléfono del usuario
     */

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    readonly phone: string
    /**
      * @example 'password123'
      * @description Contraseña del administrador
      * @default 'password123'
      * @minLength 8
      * @maxLength 50
      * @pattern (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}
      */
    @IsNotEmpty()
    readonly password: string

}
