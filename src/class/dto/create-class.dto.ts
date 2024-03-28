import { IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateClassDto {
  @MaxLength(50, {
    message: 'Tên lớp qúa dài!.',
  })
  @MinLength(1, {
    message: 'Tên lớp qúa ngắn!.',
  })
  name: string;

  @IsNumber()
  agencyId: number;
}
