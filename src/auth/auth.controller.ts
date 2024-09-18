import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/LoginDto.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HashPasswordInterceptor } from 'src/interceptor/hashPassword.interceptor';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AlreadyExistedDto } from './dto/AlreadyExistedDto.dto';

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

  @Post('/registered')
  async registered(@Body() alreadyExistedDto: AlreadyExistedDto) {
    const isRegistered = await this.userService.alreadyExist(
      alreadyExistedDto.email,
    );
    if (isRegistered) {
      throw new ConflictException('User already exists');
    }
    return isRegistered;
  }
}
