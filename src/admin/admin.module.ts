import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from 'src/datasource/prisma.service';
import { PrismaModule } from 'src/datasource/prisma.module';
import { HashPasswordInterceptor } from 'src/interceptor/hashPassword.interceptor';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, HashPasswordInterceptor],
})
export class AdminModule {}
