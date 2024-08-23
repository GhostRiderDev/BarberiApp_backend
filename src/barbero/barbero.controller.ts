import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BarberoService } from './barbero.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBarberoDto } from './dto/createBarbero.dto';
import { HashPasswordInterceptor } from 'src/interceptor/hashPassword.interceptor';
import { UpdateBarberoDto } from './dto/updateBarbero.dto';

@ApiTags('barbero')
@Controller('barbero')
export class BarberoController {
  constructor(private readonly barberoService: BarberoService) {}

  @Get()
  async getBarberos() {
    return await this.barberoService.AllBarberos();
  }

  @Post()
  @UseInterceptors(HashPasswordInterceptor)
  async createBarberos(@Body() createBarbero: CreateBarberoDto) {
    return await this.barberoService.createBarbero(createBarbero);
  }

  @Get(':id')
  async getBarbero(@Param('id', ParseUUIDPipe) id: string) {
    return await this.barberoService.detailBarbero(id);
  }

  @Delete(':id')
  async deleteBarbero(@Param('id', ParseUUIDPipe) id: string) {
    return await this.barberoService.deleteBarbero(id);
  }

  @Patch(':id')
  @UseInterceptors(HashPasswordInterceptor)
  async editBarberos(
    @Body() updateBarbero: UpdateBarberoDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.barberoService.updateBarbero(id, updateBarbero);
  }
}
