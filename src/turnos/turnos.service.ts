import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BarberoService } from 'src/barbero/barbero.service';
import { PrismaService } from 'src/datasource/prisma.service';
import { ServicesService } from 'src/services/services.service';
import { UserService } from 'src/user/user.service';
import { CreateTurnoDto } from './dto/createTurnos.dto';
import { UpdateTurnosDto } from './dto/updateTurnos.dto';

@Injectable()
export class TurnosService {
  constructor(
    private prisma: PrismaService,
    private barberoService: BarberoService,
    private userService: UserService,
    private servicesService: ServicesService,
  ) {}

  async createTurn(createTurnoDto: CreateTurnoDto) {
    const user = await this.userService.findOne(createTurnoDto.userId);
    if (!user)
      throw new NotFoundException(
        `Usuario ${createTurnoDto.userId} no encontrado`,
      );

    const barbero = await this.barberoService.barberoById(
      createTurnoDto.IdBarbero,
    );
    if (!barbero)
      throw new NotFoundException(
        `Barbero ${createTurnoDto.IdBarbero} no encontrado`,
      );

    const services = await this.servicesService.findManyServices(
      createTurnoDto.serviceIds,
    );

    if (services.length !== createTurnoDto.serviceIds.length) {
      throw new BadRequestException(
        'Uno o más IDs de servicios no son válidos.',
      );
    }

    const turn = await this.prisma.turno.create({
      data: {
        date: new Date(createTurnoDto.date),
        minute_start: createTurnoDto.minute_start,
        userId: createTurnoDto.userId,
        IdBarbero: createTurnoDto.IdBarbero,
      },
    });

    //*Guarca en la tabla intermedia turnosServices
    await this.prisma.turnoService.createMany({
      data: createTurnoDto.serviceIds.map((serviceId) => ({
        turnoId: turn.id,
        serviceId,
      })),
    });

    return { message: 'Turno creado', turn };
  }

  async allTurnos() {
    return await this.prisma.turno.findMany({
      include: {
        User: true,
        Barbero: true,
        services: {
          include: { Service: true },
        },
      },
    });
  }

  async findOneTurn(id: string) {
    const findTurn = await this.prisma.turno.findUnique({
      where: { id: id },
      include: {
        User: true,
        Barbero: true,
        services: {
          include: { Service: true },
        },
      },
    });
    if (!findTurn) throw new NotFoundException('Turno no encontrado');
    return findTurn;
  }
  async deleteTurn(id: string) {
    const findTurn = await this.prisma.turno.findUnique({
      where: { id: id },
    });
    if (!findTurn) throw new NotFoundException('Turno no encontrado');
    return { message: `Turno ${id} eliminado` };
  }

  async updateTurn(id: string, updateTurnosDto: UpdateTurnosDto) {
    const turn = await this.prisma.turno.findUnique({ where: { id: id } });
    if (!turn) throw new NotFoundException('Turno no encontrado');

    let user: string = turn.userId;
    if (updateTurnosDto.userId) {
      const findUser = await this.userService.findOne(updateTurnosDto.userId);
      if (!findUser)
        throw new NotFoundException(
          `Usuario ${updateTurnosDto.userId} no encontrado`,
        );
      user = findUser.id;
    }

    let barbero: string = turn.IdBarbero;
    if (updateTurnosDto.IdBarbero) {
      const findBarbero = await this.barberoService.barberoById(
        updateTurnosDto.IdBarbero,
      );
      if (!findBarbero)
        throw new NotFoundException(
          `Barbero ${updateTurnosDto.IdBarbero} no encontrado`,
        );
      barbero = findBarbero.id;
    }

    if (updateTurnosDto.serviceIds) {
      const services = await this.servicesService.findManyServices(
        updateTurnosDto.serviceIds,
      );

      if (services.length !== updateTurnosDto.serviceIds.length) {
        throw new BadRequestException(
          'Uno o más IDs de servicios no son válidos.',
        );
      }

      await this.prisma.turnoService.deleteMany({
        where: {
          turnoId: turn.id,
        },
      });

      await this.prisma.turnoService.createMany({
        data: updateTurnosDto.serviceIds.map((serviceId) => ({
          turnoId: turn.id,
          serviceId,
        })),
      });
    }

    const turno = await this.prisma.turno.update({
      where: {
        id: id,
      },
      data: {
        date: updateTurnosDto.date ? new Date(updateTurnosDto.date) : turn.date,
        minute_start: updateTurnosDto.minute_start
          ? updateTurnosDto.minute_start
          : turn.minute_start,
        userId: user,
        IdBarbero: barbero,
      },
    });

    return { message: 'Turno actualizado', turno };
  }
}
