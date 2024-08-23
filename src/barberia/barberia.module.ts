import { Module } from '@nestjs/common';
import { BarberiaController } from './barberia.controller';
import { BarberiaService } from './barberia.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [BarberiaController],
  providers: [BarberiaService],
})
export class BarberiaModule {}
