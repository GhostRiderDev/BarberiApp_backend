import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    @Inject(AdminService)
    private readonly adminService: AdminService,
  ) {}

  @Get()
  getAdmins() {
    return this.adminService.findAdmins();
  }

  @Get('/:id')
  getAdmin(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.adminService.findAdmin(id);
  }

  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Put('/:id')
  updateAdmin(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAdmin: Partial<CreateAdminDto>,
  ) {
    return this.adminService.updateAdmin(id, updateAdmin);
  }
}
