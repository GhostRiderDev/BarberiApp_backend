import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/datasource/prisma.service';
import { CreateBarberiaDto } from './dto/barberia.dto';

@Injectable()
export class BarberiaService {
  constructor(private prisma: PrismaService) {}

  async findBarberiasByUbication(departamento: string, ciudad: string, ubicacion: string) {
    return this.prisma.barberia.findMany({
      where: {
        departamento: {
          contains: departamento.toLowerCase(),
          mode: 'insensitive',
        },
        ciudad: {
          contains: ciudad.toLowerCase(),
          mode: 'insensitive',
        },
        ubicacion: {
          contains: ubicacion.toLowerCase(),
          mode: 'insensitive'
        }
      },
    });


  }

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
    const adminExists = await this.prisma.admin.findUnique({
      where: {
        id: barberiaDto.adminId,
      },
    });

    if (!adminExists) {
      throw new Error('Admin does not exist');
    }

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
