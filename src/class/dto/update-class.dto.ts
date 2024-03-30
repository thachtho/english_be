import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';
import { IsClassAlreadyExist } from '../validators/isClassUnique';

export class UpdateClassDto {
  @MaxLength(50, {
    message: 'Tên lớp qúa dài!.',
  })
  @MinLength(1, {
    message: 'Tên lớp qúa ngắn!.',
  })
  @IsNotEmpty()
  @IsClassAlreadyExist({
    message: 'Tên lớp $value Đã tồn tại. Vui lòng chọn tên khác!.',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
