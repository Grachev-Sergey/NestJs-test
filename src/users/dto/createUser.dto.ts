import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address',
    example: 'example@gmail.com',
    required: true,
  })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({
    description: 'Password',
    example: '1q2w3e',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 12, {
    message: 'Password length must be between 6 and 12 characters',
  })
  readonly password: string;
}
