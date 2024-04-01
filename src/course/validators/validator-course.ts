/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class ValidatorCouseConstraint implements ValidatorConstraintInterface {
  async validate(name: any, args: ValidationArguments) {
    const from = args.object['from'];
    const to = args.object['to'];

    if (to < from) {
      return false;
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
