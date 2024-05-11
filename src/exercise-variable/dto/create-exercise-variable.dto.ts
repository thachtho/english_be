import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExerciseVariableDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
