import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Auth([ROLE.ADMIN_AGENCY])
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @Auth([ROLE.ADMIN_AGENCY])
  async findAll(@Query() query: { courseId: string }) {
    const { courseId } = query;
    return this.classService.getAllByCourseId(+courseId);
  }

  @Patch(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Get('studentsInClass/:id')
  @Auth([ROLE.ADMIN_AGENCY, ROLE.TEACHER])
  studentsInClass(@Param('id') id: string) {
    return this.classService.getClassDetail(+id);
  }

  @Get('/:id')
  @Auth([ROLE.ADMIN_AGENCY, ROLE.TEACHER])
  findOne(@Param('id') id: string) {
    return this.classService.findOne({
      where: {
        id: +id,
      },
    });
  }

  @Delete(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  remove(@Param('id') id: string) {
    return this.classService.softDelete(+id);
  }
}
