import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
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
    return await this.repo.find({
      where: {
        agencyId,
      },
    });
  }
}
