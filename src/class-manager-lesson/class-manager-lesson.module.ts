import { Module } from '@nestjs/common';
import { ClassManagerLessonService } from './class-manager-lesson.service';
import { ClassManagerLessonController } from './class-manager-lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassManagerLessonEntity } from './class-manager-lesson.entity';
import { ClassUserModule } from 'src/class-user/class-student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassManagerLessonEntity]),
    ClassUserModule,
  ],
  controllers: [ClassManagerLessonController],
  providers: [ClassManagerLessonService],
})
export class ClassManagerLessonModule {}
