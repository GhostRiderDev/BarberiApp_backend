import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BarberiaModule } from './barberia/barberia.module';
import { PrismaModule } from './prisma/prisma.module';
import { BarberoModule } from './barbero/barbero.module';
import { ServicesModule } from './services/services.module';
import { TurnosModule } from './turnos/turnos.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    UserModule,
    BarberiaModule,
    BarberoModule,
    ServicesModule,
    TurnosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
