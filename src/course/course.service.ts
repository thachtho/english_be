import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { throwErrorExceptionInput } from 'src/libs/utils';
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
}
