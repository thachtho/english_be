import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { throwErrorExceptionInput } from 'src/libs/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  register(auth: CreateAuthDto) {
    return this.usersService.create(auth);
  }

  async signIn(nickname: string, password: string) {
    throwErrorExceptionInput({ nickname, password });

    const user = await this.usersService.findOne({
      where: {
        nickname,
      },
    });

    if (user) {
      const match = await bcrypt.compare(password, user?.password);

      if (match) {
        const payload = {
          userId: user.id,
          nickname: user.nickname,
          role: user.role,
        };
        return this.createToken(payload);
      }
    }

    throw new UnauthorizedException();
  }

  async createToken(payload: {
    nickname: string;
    userId: number;
    role: number;
  }) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(refreshToken: string, res: Response) {
    try {
      const decodedToken = this.jwtService.verify(refreshToken);
      const refreshTokenExp = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > refreshTokenExp) {
        return res.status(402).json({ refresh: false });
      }

      const payload = {
        userId: decodedToken.userId,
        nickname: decodedToken.nickname,
        role: decodedToken.role,
      };
      const { access_token, refresh_token } = await this.createToken(payload);

      res.setHeader('Set-Cookie', [`token=${access_token}; HttpOnly; Path=/`]);

      return res.send({ refresh_token });
    } catch (error) {
      return res.status(402).json({ message: 'Refresh token đã hết hạn' });
    }
  }
}
