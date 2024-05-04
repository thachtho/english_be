import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { ClassManagerLessonService } from './class-manager-lesson.service';
import { CreateClassManagerLessonDto } from './dto/create-class-manager-lesson.dto';

@Controller('class-manager-lesson')
export class ClassManagerLessonController {
  constructor(
    private readonly classManagerLessonService: ClassManagerLessonService,
  ) {}

  @Post()
  @Auth([ROLE.TEACHER])
  createClassManagerLesson(
    @Body() createClassManagerLessonDto: CreateClassManagerLessonDto,
  ) {
    return this.classManagerLessonService.createClassManagerLesson(
      createClassManagerLessonDto,
    );
  }

  @Put('active/:id')
  @Auth([ROLE.TEACHER])
  active(
    @Param('id') id: string,
    @Body() body: { id: number; active: boolean },
  ) {
    return this.classManagerLessonService.update(+id, body);
  }
}
