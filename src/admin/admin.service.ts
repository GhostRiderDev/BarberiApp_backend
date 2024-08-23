import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { Inject } from '@nestjs/common';

export class AdminService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async findAdmins() {
    return this.prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findAdmin(id: string) {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { password, ...rest } = createAdminDto;
    return this.prisma.admin.create({
      data: {
        ...rest,
        password_hash: password,
      },
    });
  }

  async updateAdmin(id: string, updateAdmin: Partial<CreateAdminDto>) {
    const { password, ...rest } = updateAdmin;
    return this.prisma.admin.update({
      where: { id },
      data: {
        ...rest,
        password_hash: password,
      },
    });
  }
}