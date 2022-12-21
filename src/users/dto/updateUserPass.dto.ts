import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  IsString,
  Length,
  ValidatorConstraint,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    return password !== (args.object as unknown)[args.constraints[0]];
  }

  defaultMessage() {
    return 'New password must not be the same as the old one';
  }
}
export class UpdateUserPasslDto {
  @IsString({})
  @Length(6, 12, {
    message: 'Password length must be between 6 and 12 characters',
  })
  readonly password: string;
  @IsString({ message: 'Password must be a string' })
  @Length(6, 12, {
    message: 'Password length must be between 6 and 12 characters',
  })
  @Validate(CustomMatchPasswords, ['password'])
  readonly newPassword: string;
}
