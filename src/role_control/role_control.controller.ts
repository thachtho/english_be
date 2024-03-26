import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleControlService } from './role_control.service';
import { CreateRoleControlDto } from './dto/create-role_control.dto';
import { UpdateRoleControlDto } from './dto/update-role_control.dto';

@Controller('role-control')
export class RoleControlController {
  constructor(private readonly roleControlService: RoleControlService) {}

  @Post()
  create(@Body() createRoleControlDto: CreateRoleControlDto) {
    return this.roleControlService.create(createRoleControlDto);
  }

  @Get()
  findAll() {
    return this.roleControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleControlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleControlDto: UpdateRoleControlDto) {
    return this.roleControlService.update(+id, updateRoleControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleControlService.remove(+id);
  }
}
