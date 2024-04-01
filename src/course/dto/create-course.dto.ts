import { IsNotEmpty, IsNumber } from 'class-validator';
import { ValidatorCouse } from '../validators/validator-course';
import { IsExitCouse } from '../validators/isExitCourse';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @ValidatorCouse({
    message: 'Dữ liệu không hợp lệ',
  })
  @IsExitCouse({
    message: 'Khóa học đã tồn tại',
  })
  @IsNotEmpty()
  @IsNumber()
  to: number;
}
