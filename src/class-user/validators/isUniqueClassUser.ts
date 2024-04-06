/* eslint-disable @typescript-eslint/ban-types */
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ClassService } from 'src/class/class.service';
import { ClassUserService } from '../class-student.service';

@ValidatorConstraint({ async: true })
export class IsClassUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly classUserService: ClassUserService,
    private classService: ClassService,
  ) {}
  async validate(name: any, args: ValidationArguments) {
    const userId = args.object['userId'];
    const classId = args.object['classId'];

    //kiểm tra học sinh đã tồn tại trong lớp hay chưa
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

    //kiểm tra học sinh có đang là học sinh của lớp khác hay không
    const userInClass =
      await this.classService.getCurrentClassWithStudentId(userId);

    if (userInClass) {
      throw new HttpException(
        `Học sinh đang là học sinh của lớp ${userInClass.name}`,
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
