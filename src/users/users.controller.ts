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
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserEmailDto } from './dto/updateUserEmai.dto';
import { UpdateUserPasslDto } from './dto/updateUserPass.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getOneUser(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Patch('update-email/:userId')
  updateUserEmail(
    @Body() userDto: UpdateUserEmailDto,
    @Param('userId') userId: number,
  ) {
    return this.usersService.updateUserEmail(userDto, userId);
  }

  @Patch('update-pass/:userId')
  updateUserPass(
    @Body() userDto: UpdateUserPasslDto,
    @Param('userId') userId: number,
  ) {
    return this.usersService.updateUserPass(userDto, userId);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('userId') userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
