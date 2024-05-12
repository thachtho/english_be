import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClassUserDto {
  // @IsClassUserAlreadyExist()
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
