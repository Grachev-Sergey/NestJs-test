import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserEmailDto } from './dto/updateUserEmai.dto';
import { UpdateUserPasslDto } from './dto/updateUserPass.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get('all')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getOneUser(@Param('userId') userId: string) {
    return this.usersService.getOneUser(userId);
  }

  @Patch('email/:userId')
  updateUserEmail(
    @Body() userDto: UpdateUserEmailDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.updateUserEmail(userDto, userId);
  }

  @Patch('pass/:userId')
  updateUserPass(
    @Body() userDto: UpdateUserPasslDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.updateUserPass(userDto, userId);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
