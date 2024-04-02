import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { IUserRequest } from 'src/shared/interface';
import { AddCreatedByInterceptor } from 'src/users/interceptors/add-createdBy.interceptor';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
@UseInterceptors(AddCreatedByInterceptor)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/default')
  @Auth([ROLE.ADMIN_AGENCY])
  defaultCourse(@Req() req: IUserRequest) {
    return this.courseService.getDefaultCourse(req.user.agencyId);
  }

  @Post()
  @Auth([ROLE.ADMIN_AGENCY])
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @Auth([ROLE.ADMIN_AGENCY])
  findAll(@Req() req: IUserRequest) {
    return this.courseService.getCoursesByAgencyId(req.user.agencyId);
  }

  @Get('/:id')
  @Auth([ROLE.ADMIN_AGENCY])
  findOne(@Param('id') id: number) {
    return this.courseService.findOne({
      where: {
        id,
      },
    });
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  remove(@Param('id') id: string) {
    return this.courseService.softDelete(+id);
  }
}
