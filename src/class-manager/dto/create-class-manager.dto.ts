import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClassManagerDto {
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  unitId: number;
}
