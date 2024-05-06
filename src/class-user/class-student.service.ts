import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassToUserEntity } from './class-student.entity';
import { RemoveStudentDto } from './dto/remove-student.dto';
import { getUserCls } from 'src/libs/utils';

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

  getAllClassWithStudentId() {
    const userLogin = getUserCls();

    return this.repo.find({
      where: {
        userId: userLogin?.id,
      },
      relations: {
        class: true,
      },
    });
  }
}
