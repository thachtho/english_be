import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClassUserDto {
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
