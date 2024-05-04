import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassManagerLessonService } from './class-manager-lesson.service';
import { CreateClassManagerLessonDto } from './dto/create-class-manager-lesson.dto';
import { UpdateClassManagerLessonDto } from './dto/update-class-manager-lesson.dto';

@Controller('class-manager-lesson')
export class ClassManagerLessonController {
  constructor(private readonly classManagerLessonService: ClassManagerLessonService) {}

  @Post()
  create(@Body() createClassManagerLessonDto: CreateClassManagerLessonDto) {
    return this.classManagerLessonService.create(createClassManagerLessonDto);
  }

  @Get()
  findAll() {
    return this.classManagerLessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classManagerLessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassManagerLessonDto: UpdateClassManagerLessonDto) {
    return this.classManagerLessonService.update(+id, updateClassManagerLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classManagerLessonService.remove(+id);
  }
}
