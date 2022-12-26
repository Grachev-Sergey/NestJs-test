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
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import type { User } from 'src/db/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetAllUsersQuery, GetUserByIdQuery } from './queries/impl';
import {
  DeleteUserCommand,
  UpdateEmailCommand,
  UpdatePassCommand,
} from './commads/impl';

import { UpdateUserEmailDto } from './dto/updateUserEmai.dto';
import { UpdateUserPasslDto } from './dto/updateUserPass.dto';

import { UserReq } from './user.swaggerDoks';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get all users from DB' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserReq] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get('all')
  async getAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @ApiOperation({ summary: 'Get one user from DB' })
  @ApiResponse({ status: HttpStatus.OK, type: UserReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':userId')
  getOneUser(@Param('userId') userId: number) {
    return this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  @ApiOperation({ summary: 'Change email' })
  @ApiResponse({ status: HttpStatus.OK, type: UserReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch('update-email')
  async updateUserEmail(@Body() userDto: UpdateUserEmailDto, @Request() req) {
    const user: User = await req.user;
    const { newEmail } = userDto;
    return this.commandBus.execute(new UpdateEmailCommand(user, newEmail));
  }

  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: HttpStatus.OK, type: UserReq })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch('update-pass')
  async updateUserPass(@Body() userDto: UpdateUserPasslDto, @Request() req) {
    const user: User = await req.user;
    const { password, newPassword } = userDto;
    return this.commandBus.execute(
      new UpdatePassCommand(user, password, newPassword),
    );
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('userId') userId: number) {
    return this.commandBus.execute(new DeleteUserCommand(userId));
  }
}
