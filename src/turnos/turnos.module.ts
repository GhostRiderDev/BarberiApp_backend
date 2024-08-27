import { PrismaModule } from 'src/prisma/prisma.module';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UserModule } from 'src/user/user.module';
import { BarberoModule } from 'src/barbero/barbero.module';

@Module({
  imports: [BarberoModule, ServicesModule, UserModule, PrismaModule],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}
