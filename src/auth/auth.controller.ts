import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';

import config from '../config';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthReq } from './auth.swaggerDoks';
import { SignInCommand, SignUpCommand } from './commands/impl';
import { ActivateAccountQuery, RefreshTokenQuery } from './queries/impl';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'New user registration' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-up')
  async signUp(@Body() userDto: CreateUserDto, @Req() req: Request) {
    const { email, password } = userDto;
    const userData = await this.commandBus.execute(
      new SignUpCommand(email, password),
    );
    req.res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: config.token.refresh.cookieMaxAge,
      httpOnly: true,
    });
    return userData;
  }

  @ApiOperation({ summary: 'User authorization' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/sign-in')
  async signIn(@Body() userDto: CreateUserDto, @Req() req: Request) {
    const { email, password } = userDto;
    const userData = await this.commandBus.execute(
      new SignInCommand(email, password),
    );
    req.res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: config.token.refresh.cookieMaxAge,
      httpOnly: true,
    });
    return userData;
  }

  @ApiOperation({ summary: 'Activate account' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('/activate/:link')
  activate(@Req() req: Request, @Res() res: Response) {
    this.queryBus.execute(new ActivateAccountQuery(req.params.link));
    return res.redirect(config.frontUrl);
  }

  @ApiOperation({ summary: 'Update access token' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('/refresh')
  async refresh(@Req() req: Request) {
    const { refreshToken } = req.cookies;
    const tokens = await this.queryBus.execute(
      new RefreshTokenQuery(refreshToken),
    );
    return tokens;
  }
}
