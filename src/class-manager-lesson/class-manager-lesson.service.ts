import { Injectable } from '@nestjs/common';
import { CreateClassManagerLessonDto } from './dto/create-class-manager-lesson.dto';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassManagerLessonEntity } from './class-manager-lesson.entity';
import { getUserCls } from 'src/libs/utils';
import { ClassUserService } from 'src/class-user/class-student.service';

@Injectable()
export class ClassManagerLessonService extends BaseService<ClassManagerLessonEntity> {
  constructor(
    @InjectRepository(ClassManagerLessonEntity)
    private repo: Repository<ClassManagerLessonEntity>,
    private readonly classUserService: ClassUserService,
  ) {
    super(repo);
  }
  async createClassManagerLesson(
    createClassManagerLessonDto: CreateClassManagerLessonDto,
  ) {
    const dataCheck = await this.repo.findOne({
      where: {
        classManagerId: createClassManagerLessonDto.classManagerId,
        lessonId: createClassManagerLessonDto.lessonId,
      },
    });

    if (!dataCheck) {
      return this.repo.save(createClassManagerLessonDto);
    }
  }

  async checkPermisson(id: number) {
    const userLogin = getUserCls();
    const managerLesson = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        classManager: true,
      },
    });
    const classId = managerLesson?.classManager?.classId;

    if (!classId || !userLogin?.id) {
      return false;
    }
    const classUser = await this.classUserService.findOne({
      where: {
        userId: userLogin?.id,
        classId: classId,
      },
      select: ['id'],
    });

    if (classUser) {
      return true;
    }

    return false;
  }
}
