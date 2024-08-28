import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/createTurnos.dto';
import { UpdateTurnosDto } from './dto/updateTurnos.dto';

@ApiTags('turnos')
@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  createTurno(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.createTurn(createTurnoDto);
  }

  @Get()
  allTurns() {
    return this.turnosService.allTurnos();
  }

  @Get('id')
  oneTurn(@Param('id', ParseUUIDPipe) id: string) {
    return this.turnosService.findOneTurn(id);
  }

  @Delete('id')
  deleteTurn(@Param('id', ParseUUIDPipe) id: string) {
    return this.turnosService.deleteTurn(id);
  }

  @Patch('id')
  updateTurn(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTurno: UpdateTurnosDto,
  ) {
    return this.turnosService.updateTurn(id, updateTurno);
  }
}
