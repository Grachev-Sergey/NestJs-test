import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import config from '../config';
import IRequestWithUser from '../interfaces/requestWithUser.interface';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthReq } from './auth.swaggerDoks';
import { SignInCommand, SignUpCommand } from './commands/impl';
import { ActivateAccountQuery } from './queries/impl';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'New user registration' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-up')
  async signUp(
    @Body() userDto: CreateUserDto,
    @Req() request: IRequestWithUser,
  ) {
    const { email, password } = userDto;
    const userData = await this.commandBus.execute(
      new SignUpCommand(email, password),
    );
    request.res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: config.token.refresh.cookieMaxAge,
      httpOnly: true,
    });
    return userData;
  }

  @ApiOperation({ summary: 'User authorization' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-in')
  signIn(@Body() userDto: CreateUserDto) {
    const { email, password } = userDto;
    return this.commandBus.execute(new SignInCommand(email, password));
  }

  // @ApiOperation({ summary: 'Logout' })
  // @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @Post('/logout')
  // logOut(@Body() userDto: CreateUserDto) {
  //   const { email, password } = userDto;
  //   return this.commandBus.execute(new SignInCommand(email, password));
  // }

  @ApiOperation({ summary: 'Activate account' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('/activate/:link')
  activate(@Param('link') link: string) {
    // eslint-disable-next-line no-console
    console.log(link);
    this.queryBus.execute(new ActivateAccountQuery(link));
    // return this.commandBus.execute(new SignInCommand(email, password));
  }

  // @ApiOperation({ summary: 'Update access token' })
  // @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @Post('/refresh')
  // refresh(@Body() userDto: CreateUserDto) {
  //   const { email, password } = userDto;
  //   return this.commandBus.execute(new SignInCommand(email, password));
  // }
}
