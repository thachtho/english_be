import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('check-permisson/:id')
  @Auth([ROLE.STUDENT])
  checkPermisson(@Param('id') id: ParseIntPipe) {
    return this.classManagerLessonService.checkPermisson(+id);

    return true;
  }

  @Get(':id')
  @Auth([ROLE.STUDENT])
  getOne(@Param('id') id: ParseIntPipe) {
    return this.classManagerLessonService.findOne({
      where: {
        id: +id,
      },
      relations: {
        lesson: true,
      },
    });
  }
}
