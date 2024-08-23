import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { Inject } from '@nestjs/common';

export class AdminService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    console.log(createAdminDto);
    return this.prisma.admin.create({
      data: { ...createAdminDto, password_hash: createAdminDto.password },
    });
  }

  async findAdmins() {
    const raw = await this.prisma.$queryRaw`SELECT * FROM Admin`;
    console.log('raw', raw);
  }
}
