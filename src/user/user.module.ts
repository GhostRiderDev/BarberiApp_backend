import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashPasswordInterceptor } from 'src/interceptor/hashPassword.interceptor';
import { PrismaService } from 'src/prisma.service';
import { BarberoService } from 'src/barbero/barbero.service';
import { AdminService } from 'src/admin/admin.service';
import { BarberoModule } from 'src/barbero/barbero.module';
import { AdminModule } from 'src/admin/admin.module';
import { PrismaModule } from 'src/datasource/prisma.module';
import { BarberiaModule } from 'src/barberia/barberia.module';

@Module({
  imports: [BarberoModule, AdminModule, PrismaModule, BarberiaModule],
  controllers: [UserController],
  providers: [
    UserService,
    HashPasswordInterceptor,
    PrismaService,
    AdminService,
    BarberoService,
  ],
  exports: [UserService],
})
export class UserModule {}
