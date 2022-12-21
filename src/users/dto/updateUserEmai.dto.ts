import { IsEmail, IsString } from 'class-validator';
export class UpdateUserEmailDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly newEmail: string;
}
