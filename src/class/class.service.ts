import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';

@Injectable()
export class ClassService extends BaseService<ClassEntity> {
  constructor(
    @InjectRepository(ClassEntity)
    private repo: Repository<ClassEntity>,
  ) {
    super(repo);
  }

  getAllByAgency(agencyId: number) {
    return this.repo.find({
      where: {
        agencyId,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
