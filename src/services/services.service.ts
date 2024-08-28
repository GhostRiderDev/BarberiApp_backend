import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma.service';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  findAll() {
    return this.prisma.service.findMany();
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({ where: { id } });
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }

  async findManyServices(serviceIds: string[]): Promise<Service[]> {
    return await this.prisma.service.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
    });
  }
}
