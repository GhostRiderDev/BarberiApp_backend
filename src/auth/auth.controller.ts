import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginAuthDto } from './dto/LoginDto.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HashPasswordInterceptor } from 'src/interceptor/hashPassword.interceptor';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication management')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    const response = await this.authService.signIn(loginAuthDto);
    return response;
  }

  @Post('signup')
  @UseInterceptors(new HashPasswordInterceptor())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
