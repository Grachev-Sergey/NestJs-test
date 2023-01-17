import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  // Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthGuard } from '../guards/auth.guard';

import IRequestWithUser from '../interfaces/requestWithUser.interface';

import { GetAllUsersQuery, GetMeQuery, GetUserByIdQuery } from './queries/impl';
import {
  DeleteUserCommand,
  //   LogOutCommand,
  UpdatePhotoCommand,
  UpdateInfoCommand,
  UpdatePassCommand,
} from './commads/impl';

import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';
import { UpdateUserPasslDto } from './dto/updateUserPass.dto';
import { UpdatePhotolDto } from './dto/updatePhoto.dto';

import { UserReq, UserWithRrelationsReq } from './user.swaggerDoks';
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get all users from DB' })
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users not found',
  })
  @Get('all')
  async getAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @ApiOperation({ summary: 'Get one user from DB' })
  @ApiResponse({ status: HttpStatus.OK, type: UserReq })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get(':userId')
  async getOneUser(@Param('userId') userId: number) {
    return this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  @ApiOperation({ summary: 'Check user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserWithRrelationsReq })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get()
  async getMe(@Req() req: IRequestWithUser) {
    return this.queryBus.execute(new GetMeQuery(req.user));
  }

  @ApiOperation({ summary: 'Change user info' })
  @ApiResponse({ status: HttpStatus.OK, type: UserWithRrelationsReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Email is used' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Patch('change-info')
  async updateUserInfo(
    @Body() userDto: UpdateUserInfoDto,
    @Req() req: IRequestWithUser,
  ) {
    const user = req.user;
    const { email, fullName } = userDto;
    return this.commandBus.execute(
      new UpdateInfoCommand(user, email, fullName),
    );
  }

  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: HttpStatus.OK, type: UserWithRrelationsReq })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong password',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Patch('change-pass')
  async updateUserPass(
    @Body() userDto: UpdateUserPasslDto,
    @Req() req: IRequestWithUser,
  ) {
    const user = req.user;
    const { password, newPassword } = userDto;
    return this.commandBus.execute(
      new UpdatePassCommand(user, password, newPassword),
    );
  }

  @ApiOperation({ summary: 'Change photo' })
  @ApiResponse({ status: HttpStatus.OK, type: UserWithRrelationsReq })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Patch('upload-photo')
  async updateUserPhoto(
    @Body() userDto: UpdatePhotolDto,
    @Req() req: IRequestWithUser,
  ) {
    const { avatar } = userDto;
    const user = req.user;
    return this.commandBus.execute(new UpdatePhotoCommand(user, avatar));
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('userId') userId: number) {
    return this.commandBus.execute(new DeleteUserCommand(userId));
  }

  //   @ApiOperation({ summary: 'Logout' })
  //   @ApiResponse({ status: HttpStatus.NO_CONTENT })
  //   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  //   @Post('/logout')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   logOut(@Req() req: IRequestWithUser) {
  //     const user = req.user;
  //     req.res.clearCookie('refreshToken');
  //     return this.commandBus.execute(new LogOutCommand(user));
  //   }
}
