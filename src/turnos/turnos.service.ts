import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TurnosService {
  constructor(private prisma: PrismaService) {}
}
