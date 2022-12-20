import { IsEmail, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;
  @IsString({})
  @Length(4, 12, {
    message: 'Password length must be between 6 and 12 characters',
  })
  readonly password: string;
}
