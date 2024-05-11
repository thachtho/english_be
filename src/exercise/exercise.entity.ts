import { ExcerciseVariableEntity } from 'src/exercise-variable/exercise-variable.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'exercise' })
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'class_manager_lesson_id' })
  classManagerLessonId: number;

  @OneToMany(
    () => ExcerciseVariableEntity,
    (exerciseVariable) => exerciseVariable.exercise,
  )
  public exerciseVariables: ExcerciseVariableEntity[];
}
