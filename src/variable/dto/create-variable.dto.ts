import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVariableDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  vi: string;

  @IsNotEmpty()
  @IsNumber()
  lessonId: number;
}
