import { Module } from '@nestjs/common';
import { BarberiaController } from './barberia.controller';
import { BarberiaService } from './barberia.service';
import { PrismaModule } from 'src/datasource/prisma.module';
import { PrismaService } from 'src/datasource/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [BarberiaController],
  providers: [BarberiaService],
  exports: [BarberiaService],
})
export class BarberiaModule {}
