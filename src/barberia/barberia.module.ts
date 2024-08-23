import { Module } from '@nestjs/common';
import { BarberiaController } from './barberia.controller';
import { BarberiaService } from './barberia.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BarberiaController],
  providers: [BarberiaService, PrismaService],
})
export class BarberiaModule {}
