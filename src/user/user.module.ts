import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashPasswordInterceptor } from 'src/interceptor/hashPassword.interceptor';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashPasswordInterceptor, PrismaService],
})
export class UserModule { }
