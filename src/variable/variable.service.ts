import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { VariableEntity } from './variable.entity';

@Injectable()
export class VariableService extends BaseService<VariableEntity> {
  constructor(
    @InjectRepository(VariableEntity)
    private repo: Repository<VariableEntity>,
  ) {
    super(repo);
  }
}
