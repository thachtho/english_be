import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleControlDto } from './dto/create-role_control.dto';
import { RoleControlService } from './role_control.service';

@Controller('role-control')
export class RoleControlController {
  constructor(private readonly roleControlService: RoleControlService) {}

  @Post()
  create(@Body() createRoleControlDto: CreateRoleControlDto) {
    return this.roleControlService.create(createRoleControlDto);
  }

  @Get()
  findAll() {
    return this.roleControlService.getControls(2);
  }
}
