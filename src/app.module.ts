import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BarberiaModule } from './barberia/barberia.module';
import { PrismaModule } from './datasource/prisma.module';
import { BarberoModule } from './barbero/barbero.module';
import { ServicesModule } from './services/services.module';
import { TurnosModule } from './turnos/turnos.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AdminModule,
    UserModule,
    BarberiaModule,
    BarberoModule,
    ServicesModule,
    TurnosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtService],
  exports: [],
})
export class AppModule {}
