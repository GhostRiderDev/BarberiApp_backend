import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBarberiaDto } from './dto/barberia.dto';

@Injectable()
export class BarberiaService {
  constructor(private prisma: PrismaService) {}

  async findBarberias() {
    return this.prisma.barberia.findMany();
  }

  async findBarberiaById(id: string) {
    return this.prisma.barberia.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createBarberia(barberiaDto: CreateBarberiaDto) {
    return this.prisma.barberia.create({
      data: barberiaDto,
    });
  }

  async updateBarberia(id: string, barberiaDto: Partial<CreateBarberiaDto>) {
    return this.prisma.barberia.update({
      where: {
        id: id,
      },
      data: { ...barberiaDto },
    });
  }

  async deleteBarberia(id: string) {
    return this.prisma.barberia.delete({
      where: {
        id: id,
      },
    });
  }
}