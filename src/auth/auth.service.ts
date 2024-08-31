import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/LoginDto.dto';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { BarberoService } from 'src/barbero/barbero.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly barberService: BarberoService,
  ) {}

  async signIn({ password, email }: LoginAuthDto) {
    const client = await this.userService.findByEmail(email);
    const admin = await this.adminService.findAdminByEmail(email);
    const barber = await this.barberService.findBarberoByEmail(email);

    const user = client || admin || barber;
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, sub: user.id };
    try {
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token,
      };
    } catch (error) {
      console.log(error);
    }
  }


 
}
