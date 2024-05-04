import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClassManagerLessonDto {
  @IsNotEmpty()
  @IsNumber()
  classManagerId: number;

  @IsNotEmpty()
  @IsNumber()
  lessonId: number;
}
