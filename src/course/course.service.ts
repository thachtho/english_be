import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { getUserCls, throwErrorExceptionInput } from 'src/libs/utils';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService extends BaseService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity)
    private repo: Repository<CourseEntity>,
  ) {
    super(repo);
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  async getCoursesByAgencyId(agencyId: number) {
    throwErrorExceptionInput(agencyId);
    return await this.repo.find({
      where: {
        agencyId,
      },
    });
  }

  async getDefaultCourse(agencyId: number) {
    throwErrorExceptionInput(agencyId);
    const data = await this.repo.findOne({
      where: {
        agencyId,
      },
      select: ['id'],
      order: {
        id: 'DESC',
      },
    });

    return data?.id;
  }

  getAllClassWithTeacher() {
    const userRequest = getUserCls();

    return this.repo.find({
      relations: {
        classList: true,
      },
      where: {
        agencyId: userRequest.agencyId,
        classList: {
          teacherId: userRequest.id,
        },
      },
      order: {
        id: 'DESC',
        classList: {
          blockId: 'DESC',
          name: 'DESC',
        },
      },
      select: {
        id: true,
        from: true,
        to: true,
        classList: {
          name: true,
          id: true,
          blockId: true,
        },
      },
    });
  }
}
