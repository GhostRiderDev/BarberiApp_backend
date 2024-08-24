import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }


  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...rest,
        password_hash: password,
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany(
      {
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          img_perfil_url: true
        }
      }
    );
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
        where: { id }
      })

    } catch (error) {
      return error.message;

    }
  }
}
