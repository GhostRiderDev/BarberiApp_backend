import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BarberoService } from './barbero.service';
import { BarberoController } from './barbero.controller';
import { BarberiaModule } from 'src/barberia/barberia.module';

@Module({
  imports: [BarberiaModule, PrismaModule],
  controllers: [BarberoController],
  providers: [BarberoService],
  exports: [BarberoService],
})
export class BarberoModule {}
