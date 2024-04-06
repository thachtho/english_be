import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';
import { CourseService } from 'src/course/course.service';
import { getUserCls, throwErrorExceptionInput } from 'src/libs/utils';

@Injectable()
export class ClassService extends BaseService<ClassEntity> {
  constructor(
    @InjectRepository(ClassEntity)
    private repo: Repository<ClassEntity>,
    private courseService: CourseService,
  ) {
    super(repo);
  }

  getAllByCourseId(courseId: number) {
    return this.repo.find({
      where: {
        courseId,
      },
    });
  }

  getClassDetail(id: number) {
    throwErrorExceptionInput(id);
    return this.repo.findOne({
      where: {
        id: +id,
      },
      relations: {
        teacher: true,
        classToStudents: {
          user: true,
        },
      },
      select: {
        id: true,
        name: true,
        teacher: {
          id: true,
          fullname: true,
          nickname: true,
        },
        classToStudents: {
          id: true,
          user: {
            id: true,
            nickname: true,
            fullname: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }

  async getCurrentClassWithStudentId(studentId: number) {
    const userRequest = getUserCls();
    const currentCourseId = await this.courseService.getDefaultCourse(
      userRequest.agencyId,
    );
    //tìm trong năm học đó học sinh đó đang học lớp nào
    const dataClass = await this.repo.findOne({
      relations: {
        classToStudents: true,
      },
      where: {
        courseId: currentCourseId,
        classToStudents: {
          userId: studentId,
        },
      },
    });

    return dataClass;
  }
}
