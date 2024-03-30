import { Request } from 'express';
import { UserEntity } from 'src/users/user.entity';

interface IUser {
  user: UserEntity;
}

export interface IUserRequest extends IUser, Request {}
