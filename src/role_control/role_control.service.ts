import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { RoleControlEntity } from './role_control.entity';
import { throwErrorExceptionInput } from 'src/libs/utils';

@Injectable()
export class RoleControlService extends BaseService<RoleControlEntity> {
  constructor(
    @InjectRepository(RoleControlEntity)
    private repo: Repository<RoleControlEntity>,
  ) {
    super(repo);
  }

  getControls(role: number) {
    throwErrorExceptionInput(role);
    return this.repo.find({
      where: {
        roleId: role,
      },
      relations: {
        control: {
          controlChildrens: true,
        },
      },
      select: {
        id: true,
        control: {
          id: true,
          name: true,
          path: true,
          controlChildrens: {
            id: true,
            name: true,
            path: true,
          },
        },
      },
    });
  }
}
