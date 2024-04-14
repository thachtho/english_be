import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsUserAlreadyExist } from '../validators/isNicknameUnique';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'FullName qúa dài!.',
  })
  @MinLength(3, {
    message: 'FullName qúa ngắn!.',
  })
  fullname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'NickName qúa dài!.',
  })
  @MinLength(2, {
    message: 'NickName qúa ngắn!.',
  })
  @IsUserAlreadyExist({
    message: 'NickName $value Đã tồn tại. Vui lòng chọn tên khác!.',
  })
  nickname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Password qúa dài!.',
  })
  @MinLength(4, {
    message: 'Password qúa ngắn!.',
  })
  password?: string;

  @IsOptional()
  @IsNumber()
  @Max(4, {
    message: 'Role qúa không hợp lệ!.',
  })
  @Min(1, {
    message: 'Role qúa không hợp lệ!.',
  })
  role?: number;
}
