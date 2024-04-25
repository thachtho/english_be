import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { StudyProgramEntity } from './study-program.entity';

@Injectable()
export class StudyProgramService extends BaseService<StudyProgramEntity> {
  constructor(
    @InjectRepository(StudyProgramEntity)
    private repo: Repository<StudyProgramEntity>,
  ) {
    super(repo);
  }
}
