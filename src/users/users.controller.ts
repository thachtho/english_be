import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ROLE } from 'src/shared/enum';
import { CreateUserDto } from './dto/create-user.dto';
import { AddCreatedByInterceptor } from './interceptors/add-createdBy.interceptor';
import { UsersService } from './users.service';
import { IUserRequest } from 'src/shared/interface';

@Controller('users')
@UseInterceptors(AddCreatedByInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createTeacherOrStudent(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createTeacherOrStudent(createUserDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/admin-agency')
  async createAdminAgency(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createAdminAgency(createUserDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/teacher')
  async findTeacher(@Req() req: IUserRequest) {
    return this.usersService.getTeachersOrStudents(
      req.user.userId,
      ROLE.TEACHER,
    );
  }

  @Get('/student')
  async findStudent(@Req() req: IUserRequest) {
    return this.usersService.getTeachersOrStudents(
      req.user.userId,
      ROLE.STUDENT,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({
      where: {
        id: +id,
      },
    });
  }

  @Get()
  find() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.softDelete(+id);
  }
}
