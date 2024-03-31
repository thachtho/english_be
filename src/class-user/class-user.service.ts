import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassToUserEntity } from './class-user.entity';

@Injectable()
export class ClassUserService extends BaseService<ClassToUserEntity> {
  constructor(
    @InjectRepository(ClassToUserEntity)
    private repo: Repository<ClassToUserEntity>,
  ) {
    super(repo);
  }
}
