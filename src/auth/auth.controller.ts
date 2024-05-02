import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/libs/guard/guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: LoginDto,
    @Res()
    res: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      signInDto.nickname,
      signInDto.password,
    );

    res.setHeader('Set-Cookie', [
      `token=${access_token}; HttpOnly; Path=/; SameSite=None;`,
    ]);

    return res.send({ refresh_token });
  }

  @Post('register')
  register(@Body() createUserDto: CreateAuthDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refreshToken: string },
    @Res()
    res: Response,
  ) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken, res);
  }
}
