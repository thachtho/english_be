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

  async getClassDetail(id: number) {
    return this.repo.findOne({
      where: {
        id: +id,
      },
      relations: {
        classToUsers: {
          user: true,
        },
      },
      select: {
        id: true,
        name: true,
        teacherId: true,
        classToUsers: {
          id: true,
          user: {
            id: true,
            nickname: true,
            fullname: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
