/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ClassUserService } from '../class-user.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class IsClassUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly classUserService: ClassUserService) {}
  async validate(name: any, args: ValidationArguments) {
    const userId = args.object['userId'];
    const classId = args.object['classId'];

    const data = await this.classUserService.findOne({
      where: {
        userId,
        classId,
      },
    });

    if (data) {
      throw new HttpException(
        'Học sinh đã tồn tại trong lớp',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }
}

export function IsClassUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsClassUserAlreadyExistConstraint,
      async: true,
    });
  };
}
