import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassManagerEntity } from './class-manager.entity';
import { CreateClassManagerDto } from './dto/create-class-manager.dto';
import { throwErrorExceptionInput } from 'src/libs/utils';

@Injectable()
export class ClassManagerService extends BaseService<ClassManagerEntity> {
  constructor(
    @InjectRepository(ClassManagerEntity)
    private repo: Repository<ClassManagerEntity>,
  ) {
    super(repo);
  }

  async createClassManager(createClassManagerDto: CreateClassManagerDto) {
    const dataCheck = await this.repo.findOne({
      where: {
        classId: createClassManagerDto.classId,
        unitId: createClassManagerDto.unitId,
      },
    });

    if (!dataCheck) {
      return this.repo.save(createClassManagerDto);
    }
  }

  async getUnitLessonInClass(classId: number) {
    throwErrorExceptionInput(classId);
    return await this.repo.find({
      where: {
        classId,
      },
      relations: {
        unit: true,
        classManagerLessons: {
          lesson: true,
        },
      },
      order: {
        id: 'ASC',
        classManagerLessons: {
          id: 'ASC',
        },
      },
      select: {
        id: true,
        unitId: true,
        classId: true,
        unit: {
          id: true,
          name: true,
        },
        classManagerLessons: {
          id: true,
          lessonId: true,
          active: true,
          lesson: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
