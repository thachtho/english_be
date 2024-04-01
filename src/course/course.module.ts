import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { UsersModule } from 'src/users/users.module';
import { ValidatorCouseConstraint } from './validators/validator-course';
import { IsExitCouseConstraint } from './validators/isExitCourse';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), UsersModule],
  controllers: [CourseController],
  providers: [CourseService, ValidatorCouseConstraint, IsExitCouseConstraint],
})
export class CourseModule {}
