import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BarberiaModule } from './barberia/barberia.module';
import { PrismaModule } from './prisma/prisma.module';
import { BarberoModule } from './barbero/barbero.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    UserModule,
    BarberiaModule,
    BarberoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
