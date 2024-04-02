/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CourseService } from '../course.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class ValidatorCouseConstraint implements ValidatorConstraintInterface {
  constructor(private readonly courseServiceuserService: CourseService) {}

  async validate(name: any, args: ValidationArguments) {
    const from = args.object['from'];
    const to = args.object['to'];
    const id = args.object['id'];
    const agencyId = args.object['agencyId'];

    if (to < from) {
      throw new HttpException(
        'Năm bắt đầu không thể nhỏ hơn năm kết thúc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (from === to) {
      throw new HttpException(
        'Năm bắt đầu không thể bằng kết thúc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = await this.courseServiceuserService.findOne({
      where: {
        from,
        to,
        agencyId,
      },
    });

    if (id && data?.id === args.object['id']) {
      return true;
    }

    if (data) {
      throw new HttpException(
        'Khóa học đã tồn tại!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }
}

export function ValidatorCouse(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorCouseConstraint,
    });
  };
}
