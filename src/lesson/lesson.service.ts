import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { throwErrorExceptionInput } from 'src/libs/utils';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Injectable()
export class LessonService extends BaseService<LessonEntity> {
  constructor(
    @InjectRepository(LessonEntity)
    private repo: Repository<LessonEntity>,
  ) {
    super(repo);
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }

  getLessonByUnitId(unitId: number) {
    throwErrorExceptionInput(unitId);
    return this.repo.find({
      where: {
        unitId,
      },
    });
  }

  getVariableByLessonId(lessonId: number) {
    throwErrorExceptionInput(lessonId);

    return this.repo.findOne({
      where: {
        id: lessonId,
      },
      relations: {
        variables: true,
      },
    });
  }
}
