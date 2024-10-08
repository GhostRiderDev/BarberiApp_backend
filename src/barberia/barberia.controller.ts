import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BarberiaService } from './barberia.service';
import { CreateBarberiaDto } from './dto/barberia.dto';
import { ApiTags } from '@nestjs/swagger';
import { NormalizeStringPipe } from 'src/utils/pipes/NormalizeStringPipe';

@ApiTags('barberia')
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

  @Get('ubication')
  async getBarberiasByUbication(
    @Query('departamento', NormalizeStringPipe) departamento: string,
    @Query('ciudad', NormalizeStringPipe) ciudad: string,
  ) {
    return this.barberiaService.findBarberiasByUbication(departamento, ciudad);
  }

  @Get(':id')
  async getBarberiaById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.barberiaService.findBarberiaById(id);
  }

  @Post()
  async createBarberia(@Body() barberiaToCreate: CreateBarberiaDto) {
    return this.barberiaService.createBarberia(barberiaToCreate);
  }

  @Put(':id')
  async updateBarberia(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() barberiaToUpdate: Partial<CreateBarberiaDto>,
  ) {
    return this.barberiaService.updateBarberia(id, barberiaToUpdate);
  }

  @Delete(':id')
  async deleteBarberia(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.barberiaService.deleteBarberia(id);
  }
}
