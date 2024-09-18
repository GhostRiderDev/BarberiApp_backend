import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { BarberoService } from 'src/barbero/barbero.service';
import { AdminService } from 'src/admin/admin.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly barberoService: BarberoService,
    private readonly adminService: AdminService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const isRegistered = await this.alreadyExist(createUserDto.email);
    if (isRegistered) {
      throw new ConflictException('User already exists');
    }
    const userDB = await this.prisma.user.create({
      data: {
        ...rest,
        password_hash: password,
      },
    });
    const { password_hash, ...userToReturn } = userDB;
    return userToReturn;
  }

  async alreadyExist(email: string) {
    const user = await this.findByEmail(email);
    const barber = await this.barberoService.findBarberoByEmail(email);
    const admin = await this.adminService.findAdminByEmail(email);
    if (user || barber || admin) {
      return true;
    }
    return false;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        img_perfil_url: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;
    return this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        password_hash: password,
      },
    });
  }

  remove(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return error.message;
    }
  }
}
