import { Request } from 'express';

interface IUser {
  user: {
    userId: number;
  };
}
export interface IUserRequest extends IUser, Request {}
