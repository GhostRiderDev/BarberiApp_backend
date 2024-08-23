import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBarberoDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Nombre solo puede contener letras y espacios',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-z ]+$/, {
    message: 'Nombre solo puede contener letras y espacios',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  @IsOptional()
  img_perfil_url?: string;

  @IsString()
  @IsNotEmpty()
  puesto: string;

  @IsString()
  @IsNotEmpty()
  duracion_servicio: string;

  @IsUUID()
  @IsNotEmpty()
  IdBarberia: string;
}
