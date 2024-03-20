import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private connection: DataSource,
  ) {
    super(repo)
  }

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.create(createUserDto);
  }

  async isNicknameUnique(nickName: string): Promise<boolean> {
    const user = await this.findOne({ where: { nickName } });
    
    return !user;
  }
}
