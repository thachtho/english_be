import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsNumber()
  classManagerLessonId: number;
}
