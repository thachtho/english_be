import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { IUserRequest } from 'src/shared/interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
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
  findStudent(@Req() req: IUserRequest) {
    return this.usersService.getTeachersOrStudents(req.user.id, ROLE.STUDENT);
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
  @Auth([ROLE.ADMIN_AGENCY])
  remove(@Param('id') id: string) {
    return this.usersService.softDelete(+id);
  }

  @Put(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
