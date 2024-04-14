import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { ClassUserService } from './class-student.service';
import { CreateClassUserDto } from './dto/create-class-user.dto';
import { AddCreatedByInterceptor } from 'src/users/interceptors/add-createdBy.interceptor';
import { RemoveStudentDto } from './dto/remove-student.dto';

@Controller('class-user')
@UseInterceptors(AddCreatedByInterceptor)
export class ClassUserController {
  constructor(private readonly classUserService: ClassUserService) {}

  @Post()
  @Auth([ROLE.ADMIN_AGENCY])
  create(@Body() createClassUserDto: CreateClassUserDto) {
    return this.classUserService.create(createClassUserDto);
  }

  @Post('remove-student')
  @Auth([ROLE.ADMIN_AGENCY])
  removeStudentInClass(@Body() body: RemoveStudentDto) {
    return this.classUserService.removeStudentInClass(body);
  }
}
