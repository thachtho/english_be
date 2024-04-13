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
import { Auth } from 'src/libs/guard/guard';

@Controller('users')
@UseInterceptors(AddCreatedByInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth([ROLE.ADMIN_AGENCY])
  async createTeacherOrStudent(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createTeacherOrStudent(createUserDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/admin-agency')
  @Auth([ROLE.ADMIN])
  async createAdminAgency(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createAdminAgency(createUserDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/teachers')
  @Auth([ROLE.ADMIN_AGENCY])
  async findTeacher(@Req() req: IUserRequest) {
    return this.usersService.getTeachersOrStudents(req.user.id, ROLE.TEACHER);
  }

  @Get('/students')
  @Auth([ROLE.ADMIN_AGENCY])
  async findStudent(@Req() req: IUserRequest) {
    const data = await this.usersService.getTeachersOrStudents(req.user.id, ROLE.STUDENT);
    console.log(21111, data);
    return data;
  }

  @Get(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  findOneWithAdminAgency(@Param('id') id: string) {
    return this.usersService.findOne({
      where: {
        id: +id,
      },
    });
  }

  @Get('/profile/:id')
  profile(@Param('id') id: string, @Req() req: IUserRequest) {
    return this.usersService.getProfile(+id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.softDelete(+id);
  }
}
