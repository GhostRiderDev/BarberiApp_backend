import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BarberiaModule } from './barberia/barberia.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AdminModule, UserModule, BarberiaModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
