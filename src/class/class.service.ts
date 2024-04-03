import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';

@Injectable()
export class ClassService extends BaseService<ClassEntity> {
  constructor(
    @InjectRepository(ClassEntity)
    private repo: Repository<ClassEntity>,
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

  async getClassDetail(id: number) {
    const data = await this.repo.findOne({
      where: {
        id: +id,
      },
      relations: {
        teacher: true,
        classToUsers: {
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
        classToUsers: {
          id: true,
          user: {
            id: true,
            nickname: true,
            fullname: true,
          },
        },
      },
    });

    console.log(123213, data);

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
