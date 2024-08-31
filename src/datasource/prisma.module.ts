import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BarberoService } from 'src/barbero/barbero.service';
import { BarberoModule } from 'src/barbero/barbero.module';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
