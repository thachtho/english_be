import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne({
      where: {
        id: +id,
      },
    });
  }

  @Get('lesson-by-unitId/:id')
  getLessonByUnitId(@Param('id') unitId: number) {
    return this.lessonService.getLessonByUnitId(+unitId);
  }

  @Get('/get-variables/:id')
  getVariableByLessonId(@Param('id') lessonId: string) {
    return this.lessonService.getVariableByLessonId(+lessonId);
  }
}
