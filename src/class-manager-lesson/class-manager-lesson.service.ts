import { Injectable } from '@nestjs/common';
import { CreateClassManagerLessonDto } from './dto/create-class-manager-lesson.dto';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassManagerLessonEntity } from './class-manager-lesson.entity';

@Injectable()
export class ClassManagerLessonService extends BaseService<ClassManagerLessonEntity> {
  constructor(
    @InjectRepository(ClassManagerLessonEntity)
    private repo: Repository<ClassManagerLessonEntity>,
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
}
