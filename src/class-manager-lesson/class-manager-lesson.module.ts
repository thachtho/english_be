import { Module } from '@nestjs/common';
import { ClassManagerLessonService } from './class-manager-lesson.service';
import { ClassManagerLessonController } from './class-manager-lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassManagerLessonEntity } from './class-manager-lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassManagerLessonEntity])],
  controllers: [ClassManagerLessonController],
  providers: [ClassManagerLessonService],
})
export class ClassManagerLessonModule {}
