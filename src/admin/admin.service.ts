import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { Inject } from '@nestjs/common';

export class AdminService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { password, ...rest } = createAdminDto;
    return this.prisma.admin.create({
      data: {
        ...rest,
        password_hash: password,
      },
    });
  }

  async findAdmins() {
    return this.prisma.admin.findMany();
  }
}
