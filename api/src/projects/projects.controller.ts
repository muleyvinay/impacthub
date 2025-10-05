import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import type { CreateProjectDto } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateProjectDto> & { raised?: number }) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}


