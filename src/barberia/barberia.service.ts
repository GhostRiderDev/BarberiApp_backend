import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBarberiaDto } from './dto/barberia.dto';

@Injectable()
export class BarberiaService {
  constructor(private prisma: PrismaService) {}

  async findBarberias() {
    return this.prisma.barberia.findMany();
  }

  async createBarberia(barberiaDto: CreateBarberiaDto) {
    return this.prisma.barberia.create({
      data: barberiaDto,
    });
  }
}
