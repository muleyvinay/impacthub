import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CreateProjectDto {
  title: string;
  mission: string;
  category: string;
  coverImage?: string;
  coverVideo?: string;
  goal?: number;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  }

  get(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: { ...dto, goal: dto.goal ?? 0 } });
  }

  update(id: string, dto: Partial<CreateProjectDto> & { raised?: number }) {
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}


