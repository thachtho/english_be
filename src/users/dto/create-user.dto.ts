import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { IsUserAlreadyExist } from "../validators/isNicknameUnique"

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(100, {
        message: "FullName qúa dài!."
    })
    @MinLength(3, {
        message: "FullName qúa ngắn!."
    })
    fullName?: string

    @IsString()
    @MaxLength(20, {
        message: "NickName qúa dài!."
    })
    @MinLength(3, {
        message: "NickName qúa ngắn!."
    })
    @IsUserAlreadyExist({
        message: 'NickName $value Đã tồn tại. Vui lòng chọn tên khác!.'
    })
    nickName: string

    @IsString()
    @MaxLength(100, {
        message: "Password qúa dài!."
    })
    @MinLength(3, {
        message: "Password qúa ngắn!."
    })
    password: string

    @IsOptional()
    @IsNumber()
    @MaxLength(1)
    role?: number


}