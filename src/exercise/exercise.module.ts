import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './exercise.entity';
import { ClassManagerLessonModule } from 'src/class-manager-lesson/class-manager-lesson.module';
import { LessonModule } from 'src/lesson/lesson.module';
import { ExerciseVariableModule } from 'src/exercise-variable/exercise-variable.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseEntity]),
    ClassManagerLessonModule,
    LessonModule,
    ExerciseVariableModule,
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
