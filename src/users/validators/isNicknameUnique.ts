/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}
  async validate(nickname: any) {
    const isUnique = await this.userService.findOne({
      where: {
        nickname,
      },
    });

    return !isUnique;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
