import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { StudyProgramEntity } from './study-program.entity';
import { getUserCls } from 'src/libs/utils';

@Injectable()
export class StudyProgramService extends BaseService<StudyProgramEntity> {
  constructor(
    @InjectRepository(StudyProgramEntity)
    private repo: Repository<StudyProgramEntity>,
  ) {
    super(repo);
  }

  getStudyProgramByBlockId(blockId: number) {
    const userLogin = getUserCls();

    return this.repo.find({
      where: {
        blockId,
        createdBy: userLogin.id,
      },
    });
  }
}
