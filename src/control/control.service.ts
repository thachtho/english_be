import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ControlEntity } from './control.entity';

@Injectable()
export class ControlService extends BaseService<ControlEntity> {
  constructor(
    @InjectRepository(ControlEntity)
    private repo: Repository<ControlEntity>,
  ) {
    super(repo);
  }

  remove(id: number) {
    return `This action removes a #${id} control`;
  }
}
