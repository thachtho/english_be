import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import * as bcrypt from 'bcryptjs';
import createNickName, { randomNumber } from 'src/libs/helper';

const passworDefault = '1111';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private connection: DataSource,
  ) {
    super(repo);
  }

  async createUser(createUserDto: CreateUserDto) {
    const nickname = createNickName(createUserDto?.fullname);
    createUserDto.nickname = nickname;
    let password = passworDefault;

    const checkUser = await this.repo.findOne({
      where: {
        nickname,
        password: passworDefault,
      },
    });

    if (checkUser) {
      password = `${randomNumber()}`;
    }
    createUserDto.password = await bcrypt.hash(password, 10);

    return this.create(createUserDto);
  }

  async isNicknameUnique(nickname: string): Promise<boolean> {
    const user = await this.findOne({ where: { nickname } });

    return !user;
  }
}
