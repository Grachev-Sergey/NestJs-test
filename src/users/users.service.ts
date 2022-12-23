import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';

import config from 'src/config';
import { User } from 'src/db/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(email: string, password: string): Promise<User> {
    const candidate = await this.userRepository.findOneBy({ email });

    if (candidate) {
      throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.email = email;
    user.password = bcryptjs.hashSync(password, config.salt);
    const newUser = await this.userRepository.save(user);
    delete newUser.password;

    return newUser;
  }
}
