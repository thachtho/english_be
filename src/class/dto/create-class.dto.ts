import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';
import { IsClassAlreadyExist } from '../validators/isClassUnique';

export class CreateClassDto {
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Tên lớp qúa dài!.',
  })
  @MinLength(1, {
    message: 'Tên lớp qúa ngắn!.',
  })
  @IsClassAlreadyExist({
    message: 'Tên lớp $value Đã tồn tại. Vui lòng chọn tên khác!.',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  agencyId: number;

  @IsNotEmpty()
  @IsNumber()
  blockId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
