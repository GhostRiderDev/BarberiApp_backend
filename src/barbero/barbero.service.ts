import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBarberoDto } from './dto/createBarbero.dto';
import { BarberiaService } from 'src/barberia/barberia.service';

@Injectable()
export class BarberoService {
  constructor(
    private prisma: PrismaService,
    private barberiaService: BarberiaService,
  ) {}

  async AllBarberos() {
    return this.prisma.barbero.findMany({ include: { Barberia: true } });
  }

  async detailBarbero(id: string) {
    const barbero = this.barberoById(id);
    if (!barbero) throw new NotFoundException('Barbero no encontrado');
    return barbero;
  }

  async createBarbero(barberoDto: CreateBarberoDto) {
    const barberia = await this.barberiaService.findBarberiaById(
      barberoDto.IdBarberia,
    );
    if (!barberia) throw new NotFoundException('Barberia no encontrada');

    const existEmail = await this.emailBarbero(barberoDto.email);
    if (existEmail) throw new ConflictException('Email Duplicado');

    return this.prisma.barbero.create({
      data: {
        email: barberoDto.email,
        name: barberoDto.name,
        phone: barberoDto.phone,
        password_hash: barberoDto.password,
        img_perfil_url: barberoDto.img_perfil_url,
        puesto: barberoDto.puesto,
        duracion_servicio: barberoDto.duracion_servicio,
        IdBarberia: barberoDto.IdBarberia,
      },
    });
  }

  async updateBarbero(id: string, barberoDto: Partial<CreateBarberoDto>) {
    const barbero = await this.barberoById(id);
    if (!barbero) throw new NotFoundException('Barbero no encontrado');

    let email = barbero.email;
    if (barberoDto.email) {
      const existEmail = await this.emailBarbero(barberoDto.email);
      if (existEmail) {
        throw new ConflictException('Email duplicado');
      }
      email = barberoDto.email;
    }

    let IdBarberia = barbero.IdBarberia;
    if (barberoDto.IdBarberia) {
      const existBarberia = await this.barberiaService.findBarberiaById(
        barberoDto.IdBarberia,
      );
      if (!existBarberia) throw new NotFoundException('Barberia no encontrada');
      IdBarberia = existBarberia.id;
    }

    return this.prisma.barbero.update({
      where: {
        id: id,
      },
      data: {
        name: barberoDto.name !== undefined ? barberoDto.name : barbero.name,
        email,
        phone: barberoDto.phone || barbero.phone,
        password_hash: barberoDto.password || barbero.password_hash,
        img_perfil_url: barberoDto.img_perfil_url || barbero.img_perfil_url,
        puesto: barberoDto.puesto || barbero.puesto,
        duracion_servicio:
          barberoDto.duracion_servicio || barbero.duracion_servicio,
        IdBarberia,
      },
    });
  }

  async deleteBarbero(id: string) {
    const barbero = await this.barberoById(id);
    if (!barbero) {
      throw new NotFoundException(`Barbero ${id} no encontrado`);
    }
    await this.prisma.barbero.delete({
      where: {
        id: id,
      },
    });
    return `Barbero ${id} eliminado`;
  }

  async emailBarbero(email: string) {
    return this.prisma.barbero.findUnique({
      where: {
        email: email,
      },
    });
  }
  async barberoById(id: string) {
    return this.prisma.barbero.findUnique({
      where: {
        id: id,
      },
      include: {
        Barberia: true,
      },
    });
  }
}
