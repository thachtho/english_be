/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ClassService } from '../class.service';

@ValidatorConstraint({ async: true })
export class IsClassAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly classService: ClassService) {}
  async validate(name: any, args: ValidationArguments) {
    const data = await this.classService.findOne({
      where: {
        name: args.object['name'].trim(),
        agencyId: args.object['agencyId'],
        courseId: args.object['courseId'],
      },
    });

    if (data?.id === args.object['id']) {
      return true;
    }

    return !data;
  }
}

export function IsClassAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsClassAlreadyExistConstraint,
      async: true,
    });
  };
}
