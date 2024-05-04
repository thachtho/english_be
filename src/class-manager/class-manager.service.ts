import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassManagerEntity } from './class-manager.entity';
import { CreateClassManagerDto } from './dto/create-class-manager.dto';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class ClassManagerService extends BaseService<ClassManagerEntity> {
  constructor(
    @InjectRepository(ClassManagerEntity)
    private repo: Repository<ClassManagerEntity>,
    private classService: ClassService,
  ) {
    super(repo);
  }

  async createClassManager(createClassManagerDto: CreateClassManagerDto) {
    console.log(222222, createClassManagerDto);
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
        unit: {
          id: true,
          name: true,
        },
        classManagerLessons: {
          id: true,
          lessonId: true,
          lesson: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
