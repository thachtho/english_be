import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateRoleControlDto } from './dto/create-role_control.dto';
import { RoleControlService } from './role_control.service';
import { IUserRequest } from 'src/shared/interface';

@Controller('role-control')
export class RoleControlController {
  constructor(private readonly roleControlService: RoleControlService) {}

  @Post()
  create(@Body() createRoleControlDto: CreateRoleControlDto) {
    return this.roleControlService.create(createRoleControlDto);
  }

  @Get()
  findAll(@Req() req: IUserRequest) {
    return this.roleControlService.getControls(req.user.role);
  }
}
