import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TurnosService } from './turnos.service';

@ApiTags('turnos')
@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}
}
