import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { ClassUserService } from './class-user.service';
import { CreateClassUserDto } from './dto/create-class-user.dto';

@Controller('class-user')
export class ClassUserController {
  constructor(private readonly classUserService: ClassUserService) {}

  @Post()
  @Auth([ROLE.ADMIN_AGENCY])
  create(@Body() createClassUserDto: CreateClassUserDto) {
    return this.classUserService.create(createClassUserDto);
  }
}
