import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}
  findAll() { return this.prisma.submission.findMany(); }
  findOne(id: string) { return this.prisma.submission.findUnique({ where: { id } }); }
}
