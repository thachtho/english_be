import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClassManagerService } from './class-manager.service';
import { CreateClassManagerDto } from './dto/create-class-manager.dto';
import { ROLE } from 'src/shared/enum';
import { Auth } from 'src/libs/guard/guard';

@Controller('class-manager')
export class ClassManagerController {
  constructor(private readonly classManagerService: ClassManagerService) {}

  @Post()
  @Auth([ROLE.TEACHER])
  createClassManager(@Body() createClassManagerDto: CreateClassManagerDto) {
    return this.classManagerService.createClassManager(createClassManagerDto);
  }

  @Get()
  @Auth([ROLE.TEACHER])
  findAll() {
    return this.classManagerService.findAll();
  }

  @Get('get-unit-lesson-class/:id')
  @Auth([ROLE.TEACHER, ROLE.STUDENT])
  getUnitLessonInClass(@Param('id') classId: ParseIntPipe) {
    return this.classManagerService.getUnitLessonInClass(+classId);
  }

  @Get(':id')
  @Auth([ROLE.TEACHER])
  getOne(@Param('id') id: ParseIntPipe) {
    return this.classManagerService.findOne({
      where: {
        id: +id,
      },
      relations: {
        unit: true,
      },
    });
  }
}
