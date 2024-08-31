import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { BarberiaService } from 'src/barberia/barberia.service';
import { BarberoService } from 'src/barbero/barbero.service';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'src/datasource/prisma.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AdminService,
    BarberoService,
    PrismaService,
    BarberiaService,
  ],
})
export class AuthModule {}
