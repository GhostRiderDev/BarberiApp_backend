import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
  exports: [ServicesService],
})
export class ServicesModule {}
