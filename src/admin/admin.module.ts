import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
