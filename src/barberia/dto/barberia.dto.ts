import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBarberiaDto {
  /**
   * @example 'Barberia de Juan'
   * @description Nombre de la barberia
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**
   * @example 'Calle 123, Ciudad, País'
   * @description Ubicación de la barber
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  ubicacion: string;

  /**
   * @example'Apartado'
   * @description Ciudad de la barberia
   */

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  ciudad: string

  /**
   * @example 'Antioquia'
   * @description Departamento de la barberia
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  departamento: string

  /**
   * @example 'https://example.com/banner.jpg'
   * @description URL de la imagen de la barber
   * @default 'https://example.com/default.jpg'
   */
  @IsString()
  @IsOptional()
  @IsUrl()
  banner_url?: string;

  /**
   * @example '123e4567-e89b-12d3-a456-426614174000'
   * @description ID del administrador de la barberia
   */
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  adminId: string;
}
