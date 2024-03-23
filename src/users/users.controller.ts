import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Public } from 'src/libs/guard/guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ROLE } from 'src/shared/enum';

@Controller('users')
@Public()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/teacher')
  findTeacher() {
    return this.usersService.findAllBy(ROLE.TEACHER);
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
