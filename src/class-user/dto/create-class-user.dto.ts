import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsClassUserAlreadyExist } from '../validators/isUniqueClassUser';

export class CreateClassUserDto {
  @IsClassUserAlreadyExist()
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
