import { Injectable } from '@nestjs/common';
import { CreateClassManagerLessonDto } from './dto/create-class-manager-lesson.dto';
import { UpdateClassManagerLessonDto } from './dto/update-class-manager-lesson.dto';

@Injectable()
export class ClassManagerLessonService {
  create(createClassManagerLessonDto: CreateClassManagerLessonDto) {
    return 'This action adds a new classManagerLesson';
  }

  findAll() {
    return `This action returns all classManagerLesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classManagerLesson`;
  }

  update(id: number, updateClassManagerLessonDto: UpdateClassManagerLessonDto) {
    return `This action updates a #${id} classManagerLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} classManagerLesson`;
  }
}
