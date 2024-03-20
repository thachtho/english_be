import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UsersService) {}
    async validate(nickName: any, args: ValidationArguments) {
        const isUnique = await this.userService.isNicknameUnique(nickName);
        return isUnique;
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
