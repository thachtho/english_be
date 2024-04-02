import { IsNotEmpty, IsNumber } from 'class-validator';
import { ValidatorCouse } from '../validators/validator-course';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @ValidatorCouse()
  @IsNotEmpty()
  @IsNumber()
  to: number;
}
