import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ExcerciseVariableEntity } from './exercise-variable.entity';

@Injectable()
export class ExerciseVariableService extends BaseService<ExcerciseVariableEntity> {
  constructor(
    @InjectRepository(ExcerciseVariableEntity)
    private repo: Repository<ExcerciseVariableEntity>,
  ) {
    super(repo);
  }
}
