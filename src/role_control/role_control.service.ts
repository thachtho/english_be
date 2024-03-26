import { Injectable } from '@nestjs/common';
import { CreateRoleControlDto } from './dto/create-role_control.dto';
import { UpdateRoleControlDto } from './dto/update-role_control.dto';

@Injectable()
export class RoleControlService {
  create(createRoleControlDto: CreateRoleControlDto) {
    return 'This action adds a new roleControl';
  }

  findAll() {
    return `This action returns all roleControl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleControl`;
  }

  update(id: number, updateRoleControlDto: UpdateRoleControlDto) {
    return `This action updates a #${id} roleControl`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleControl`;
  }
}
