import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

import type { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto) {
    const { email, password } = userDto;
    const user = await this.userService.createUser(email, password);
    const token = this.generateToken(user.id);

    return { user, token };
  }

  // async signIn(userDto: CreateUserDto) {
  //   const { email, password } = userDto;
  //   const user = await this.userService.getUserByEmail(email);
  //   await this.userService.checkMatchPassword(user.id, password);
  //   const token = this.generateToken(user.id);
  //   return { user, token };
  // }

  private generateToken = (id: number) => {
    const payload = { id };
    return this.jwtService.sign(payload);
  };
}
