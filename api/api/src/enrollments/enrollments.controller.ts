import { Controller, Get, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollments: EnrollmentsService) {}
  @Get() getAll() { return this.enrollments.findAll(); }
  @Get(':id') getOne(@Param('id') id: string) { return this.enrollments.findOne(id); }
}
