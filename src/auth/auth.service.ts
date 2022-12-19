import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { User } from 'src/db/entities/user.entity';
import type { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(userDto: CreateUserDto) {
    const { email, password } = userDto;
    const candidate = await this.userService.getUserByEmail(email);

    if (candidate) {
      throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.email = email;
    user.password = password;
    user.password = bcryptjs.hashSync(password, 5);
    await this.userRepository.save(user);
    const token = this.generateToken(user.id);
    delete user.password;
    return { user, token };
  }

  async signIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = this.generateToken(user.id);
    return { user, token };
  }

  private generateToken = (id: number) => {
    const payload = { id };
    return {
      token: this.jwtService.sign(payload),
    };
  };

  private validateUser = async (userDto: CreateUserDto) => {
    const { email, password } = userDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const id = user.id;
    const currentUserPass = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user.password')
      .getRawOne();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validPass = bcryptjs.compareSync(
      password,
      currentUserPass.user_password,
    );

    if (!validPass) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    return user;
  };
}
