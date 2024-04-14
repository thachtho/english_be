import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveStudentDto {
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
