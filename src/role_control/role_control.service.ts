import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { RoleControlEntity } from './role_control.entity';

@Injectable()
export class RoleControlService extends BaseService<RoleControlEntity> {
  constructor(
    @InjectRepository(RoleControlEntity)
    private repo: Repository<RoleControlEntity>,
  ) {
    super(repo);
  }

  getControls(role: number) {
    return this.repo.find({
      where: {
        roleId: role,
      },
      relations: {
        control: true,
      },
    });
  }
}
