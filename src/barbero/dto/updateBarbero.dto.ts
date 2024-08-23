import { PartialType } from '@nestjs/swagger';
import { CreateBarberoDto } from './createBarbero.dto';

export class UpdateBarberoDto extends PartialType(CreateBarberoDto) {}
