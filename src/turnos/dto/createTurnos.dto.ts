import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  ArrayNotEmpty,
  ArrayMinSize,
  ValidateNested,
  IsArray,
} from 'class-validator';

export class CreateTurnoDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  minute_start: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  IdBarbero: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  @IsUUID('4', { each: true })
  serviceIds: string[];
}
