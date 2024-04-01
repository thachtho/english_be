import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
