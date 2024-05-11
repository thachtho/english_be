import { ExerciseEntity } from 'src/exercise/exercise.entity';
import { VariableEntity } from 'src/variable/variable.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'exercise_variable' })
export class ExcerciseVariableEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'exercise_id' })
  exerciseId?: number;

  @Column({ name: 'variable_id' })
  variableId?: number;

  @Column({ default: 0 })
  count?: number;

  @ManyToOne(() => ExerciseEntity, (exercise) => exercise.exerciseVariables)
  @JoinColumn({ name: 'exercise_id' })
  public exercise: ExerciseEntity;

  @ManyToOne(() => VariableEntity)
  @JoinColumn({ name: 'variable_id' })
  variable: VariableEntity;
}
