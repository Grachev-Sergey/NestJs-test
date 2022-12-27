import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/createUser.dto';

import { AuthReq } from './auth.swaggerDoks';
import { SignInCommand, SignUpCommand } from './commands/impl';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'New user registration' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-up')
  signUp(@Body() userDto: CreateUserDto) {
    const { email, password } = userDto;
    return this.commandBus.execute(new SignUpCommand(email, password));
  }

  @ApiOperation({ summary: 'User authorization' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-in')
  signIn(@Body() userDto: CreateUserDto) {
    // return this.authService.signIn(userDto);
    const { email, password } = userDto;
    return this.commandBus.execute(new SignInCommand(email, password));
  }
}
