import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthReq } from './auth.swaggerDoks';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'New user registration' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-up')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  // @ApiOperation({ summary: 'User authorization' })
  // @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @Post('/sign-in')
  // signIn(@Body() userDto: CreateUserDto) {
  //   return this.authService.signIn(userDto);
  // }
}
