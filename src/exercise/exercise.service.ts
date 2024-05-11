import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { getUserCls } from 'src/libs/utils';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseEntity } from './exercise.entity';
import { ClassManagerLessonService } from 'src/class-manager-lesson/class-manager-lesson.service';
import { LessonService } from 'src/lesson/lesson.service';
import { ExerciseVariableService } from 'src/exercise-variable/exercise-variable.service';

@Injectable()
export class ExerciseService extends BaseService<ExerciseEntity> {
  constructor(
    @InjectRepository(ExerciseEntity)
    private repo: Repository<ExerciseEntity>,
    private readonly classManagerLessonService: ClassManagerLessonService,
    private readonly lessonService: LessonService,
    private readonly exerciseVariableService: ExerciseVariableService,
  ) {
    super(repo);
  }

  async createExerise(createExerciseDto: CreateExerciseDto) {
    const userLogin = getUserCls();
    const option = {
      classManagerLessonId: createExerciseDto?.classManagerLessonId,
      userId: userLogin?.id,
    };
    const dataCheck = await this.repo.findOne({
      where: option,
    });

    if (!dataCheck) {
      const exercise = await this.repo.save(option);

      const classManagerLesson = await this.classManagerLessonService.findOne({
        where: {
          id: createExerciseDto?.classManagerLessonId,
        },
      });

      const lesson = await this.lessonService.getVariableByLessonId(
        classManagerLesson?.lessonId,
      );

      const listExercises = lesson.variables.map((item) => {
        return {
          exerciseId: exercise.id,
          variableId: item.id,
        };
      });

      return this.exerciseVariableService.create(listExercises);
    }
  }

  getExerciseByClassManagerLessonId(classManagerLessonId: number) {
    const userLogin = getUserCls();
    return this.repo.findOne({
      where: {
        classManagerLessonId,
        userId: userLogin?.id,
      },
      relations: {
        exerciseVariables: {
          variable: true,
        },
      },
      select: {
        id: true,
        classManagerLessonId: true,
        userId: true,
        exerciseVariables: {
          id: true,
          variableId: true,
          count: true,
          variable: {
            id: true,
            name: true,
            vi: true,
          },
        },
      },
    });
  }
}
