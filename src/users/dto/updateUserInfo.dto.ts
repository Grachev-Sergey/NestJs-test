import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoDto {
  @ApiProperty({
    description: 'Email address',
    example: 'example@gmail.com',
  })
  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email?: string;

  @ApiProperty({
    description: 'Full name',
    example: 'Bob',
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  readonly fullName?: string;
}
