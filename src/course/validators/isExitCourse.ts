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
export class IsExitCouseConstraint implements ValidatorConstraintInterface {
  constructor(private readonly courseServiceuserService: CourseService) {}
  async validate(name: any, args: ValidationArguments) {
    const from = args.object['from'];
    const to = args.object['to'];
    const agencyId = args.object['agencyId'];

    const data = await this.courseServiceuserService.findOne({
      where: {
        from,
        to,
        agencyId,
      },
    });

    if (data?.id === args.object['id']) {
      return true;
    }

    throw new HttpException('con heo ngu', HttpStatus.INTERNAL_SERVER_ERROR);

    return !data;
  }
}

export function IsExitCouse(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExitCouseConstraint,
    });
  };
}
