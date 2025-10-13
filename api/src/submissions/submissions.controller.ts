import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissions: SubmissionsService) {}
  @Get() getAll() { return this.submissions.findAll(); }
  @Get(':id') getOne(@Param('id') id: string) { return this.submissions.findOne(id); }
}
