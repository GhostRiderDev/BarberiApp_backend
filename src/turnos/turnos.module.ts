import { PrismaModule } from 'src/prisma/prisma.module';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { BarberiaModule } from 'src/barberia/barberia.module';
import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [BarberiaModule, ServicesModule, UserService, PrismaModule],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class BarberoModule {}
