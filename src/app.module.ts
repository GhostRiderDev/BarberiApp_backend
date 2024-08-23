import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BarberiaModule } from './barberia/barberia.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AdminModule, UserModule, BarberiaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
