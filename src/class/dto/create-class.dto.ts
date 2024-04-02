import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Tên lớp qúa dài!.',
  })
  @MinLength(1, {
    message: 'Tên lớp qúa ngắn!.',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  agencyId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
