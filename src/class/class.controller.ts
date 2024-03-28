import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { AddCreatedByInterceptor } from 'src/users/interceptors/add-createdBy.interceptor';
import { IUserRequest } from 'src/shared/interface';
import { UsersService } from 'src/users/users.service';

@Controller('class')
@UseInterceptors(AddCreatedByInterceptor)
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  async findAll(@Req() req: IUserRequest) {
    const user = await this.userService.findOne({
      where: {
        id: req.user.userId,
      },
    });

    return this.classService.getAllByAgency(user.agencyId);
  }
}
