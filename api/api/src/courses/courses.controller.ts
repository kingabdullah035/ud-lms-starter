import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}
  @Get() getAll() { return this.courses.findAll(); }
  @Get(':id') getOne(@Param('id') id: string) { return this.courses.findOne(id); }
}
