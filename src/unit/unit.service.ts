import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitEntity } from './unit.entity';
import { throwErrorExceptionInput } from 'src/libs/utils';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private repo: Repository<UnitEntity>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findByStudyProgramId(studyProgramId: number) {
    throwErrorExceptionInput(studyProgramId);
    return this.repo.find({
      where: {
        studyProgramId,
      },
    });
  }

  findAllUnitLessons() {
    return this.repo.find({
      relations: {
        lessons: true,
      },
      order: {
        id: 'DESC',
        lessons: {
          id: 'DESC',
        },
      },
      select: {
        id: true,
        name: true,
        lessons: {
          id: true,
          name: true,
        },
      },
    });
  }
}
