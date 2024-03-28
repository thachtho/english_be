import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { BaseService } from 'src/base/base.service';
import createNickName, { randomNumber } from 'src/libs/helper';
import { ROLE } from 'src/shared/enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

const passworDefault = '1111';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
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

  async getTeachersOrStudents(userId: number, role: number) {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
    });

    return this.repo.find({
      where: {
        role,
        agencyId: user.agencyId,
      },
    });
  }
}
