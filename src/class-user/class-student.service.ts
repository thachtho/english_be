import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassToUserEntity } from './class-student.entity';
import { RemoveStudentDto } from './dto/remove-student.dto';

@Injectable()
export class ClassUserService extends BaseService<ClassToUserEntity> {
  constructor(
    @InjectRepository(ClassToUserEntity)
    private repo: Repository<ClassToUserEntity>,
  ) {
    super(repo);
  }

  removeStudentInClass(options: RemoveStudentDto) {
    return this.repo.softDelete({
      classId: +options.classId,
      userId: +options.userId,
    });
  }
}
