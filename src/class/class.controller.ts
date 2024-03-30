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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { AddCreatedByInterceptor } from 'src/users/interceptors/add-createdBy.interceptor';
import { IUserRequest } from 'src/shared/interface';
import { UsersService } from 'src/users/users.service';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('class')
@UseInterceptors(AddCreatedByInterceptor)
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @Auth([ROLE.ADMIN_AGENCY])
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @Auth([ROLE.ADMIN_AGENCY])
  async findAll(@Req() req: IUserRequest) {
    const user = await this.userService.findOne({
      where: {
        id: req.user.id,
      },
    });

    return this.classService.getAllByAgency(user.agencyId);
  }

  @Patch(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Get(':id')
  @Auth([ROLE.ADMIN_AGENCY, ROLE.TEACHER])
  findOne(@Param('id') id: string) {
    return this.classService.getClassDetail(+id);
  }

  @Delete(':id')
  @Auth([ROLE.ADMIN_AGENCY])
  remove(@Param('id') id: string) {
    return this.classService.softDelete(+id);
  }
}
