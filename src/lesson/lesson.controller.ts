import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { UpdateLessonDto } from './dto/update-lesson.dto';

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

  @Put(':id')
  @Auth([ROLE.TEACHER])
  updateUser(@Param('id') id: ParseIntPipe, @Body() body: UpdateLessonDto) {
    return this.lessonService.update(+id, body);
  }

  @Delete(':id')
  @Auth([ROLE.TEACHER])
  remove(@Param('id') id: string) {
    return this.lessonService.softDelete(+id);
  }
}
