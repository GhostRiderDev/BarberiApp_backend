import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        id: createUserDto.id,
        email: createUserDto.email,
        name: createUserDto.name,
        phone: createUserDto.phone,
        password_hash: createUserDto.password_hash,
        img_perfil_url: createUserDto.img_perfil_url,

      }

    });

    return newUser;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
