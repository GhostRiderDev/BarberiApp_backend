import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { BarberiaService } from './barberia.service';
import { CreateBarberiaDto } from './dto/barberia.dto';

@Controller('barberia')
export class BarberiaController {
  constructor(
    @Inject(BarberiaService)
    private readonly barberiaService: BarberiaService,
  ) {}

  @Get()
  async getBarberias() {
    return this.barberiaService.findBarberias();
  }

  @Post()
  async createBarberia(@Body() barberiaToCreate: CreateBarberiaDto) {
    return this.barberiaService.createBarberia(barberiaToCreate);
  }
}
