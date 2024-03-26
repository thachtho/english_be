import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import * as bcrypt from 'bcryptjs';
import createNickName, { randomNumber } from 'src/libs/helper';
import { ROLE } from 'src/shared/enum';

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

  async createTeacherOrStudent(createUserDto: CreateUserDto) {
    const nickname = await this.createNickName(createUserDto?.fullname);
    createUserDto.nickname = nickname;
    createUserDto.password = await bcrypt.hash(passworDefault, 10);

    return this.create(createUserDto);
  }

  async createNickName(fullname: string, nicknameCb?: string) {
    let nickname = '';

    if (!nicknameCb) {
      nickname = createNickName(fullname);
    } else {
      nickname = nicknameCb;
    }

    const checkUser = await this.repo.findOne({
      where: {
        nickname,
      },
    });

    if (checkUser) {
      const newNickname = `${nickname}${randomNumber()}`;

      return this.createNickName(fullname, newNickname);
    }

    return nickname;
  }

  async createAdminAgency(createUserDto: CreateUserDto) {
    createUserDto.role = ROLE.ADMIN_AGENCY;
    createUserDto.password = await bcrypt.hash(passworDefault, 10);

    return this.repo.save(createUserDto);
  }

  findAllBy(type: ROLE) {
    return this.repo.find({
      where: {
        role: type,
      },
    });
  }
}
