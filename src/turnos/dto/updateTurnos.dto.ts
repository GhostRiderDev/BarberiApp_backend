import { PartialType } from '@nestjs/swagger';
import { CreateTurnoDto } from './createTurnos.dto';

export class UpdateTurnosDto extends PartialType(CreateTurnoDto) {}
