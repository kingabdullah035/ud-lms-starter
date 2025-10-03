import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignments: AssignmentsService) {}

  @Get()
  getAll() {
    return this.assignments.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.assignments.findOne(id);
  }
}
