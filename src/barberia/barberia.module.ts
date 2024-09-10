import { Module } from '@nestjs/common';
import { BarberiaController } from './barberia.controller';
import { BarberiaService } from './barberia.service';
import { PrismaModule } from 'src/datasource/prisma.module';
import { PrismaService } from 'src/datasource/prisma.service';
import { NormalizeStringPipe } from 'src/utils/pipes/NormalizeStringPipe';

@Module({
  imports: [PrismaModule],
  controllers: [BarberiaController],
  providers: [BarberiaService, NormalizeStringPipe],
  exports: [BarberiaService],
})
export class BarberiaModule {}
