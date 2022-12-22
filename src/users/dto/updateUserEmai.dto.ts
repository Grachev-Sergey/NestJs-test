import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserEmailDto {
  @ApiProperty({
    description: 'Email address',
    example: 'example@gmail.com',
  })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly newEmail: string;
}
