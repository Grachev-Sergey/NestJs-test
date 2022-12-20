import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';

import { config } from 'src/config';
import { User } from 'src/db/entities/user.entity';
import type { UpdateUserEmailDto } from './dto/updateUserEmai.dto';
import type { UpdateUserPasslDto } from './dto/updateUserPass.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

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

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
  }

  async updateUserEmail(
    dto: UpdateUserEmailDto,
    userId: number,
  ): Promise<User> {
    const { newEmail } = dto;
    const user = await this.getUserById(userId);

    user.email = newEmail;
    await this.userRepository.save(user);
    return user;
  }

  async updateUserPass(dto: UpdateUserPasslDto, userId: number): Promise<User> {
    const { password, newPassword } = dto;

    const user = await this.getUserById(userId);

    await this.checkMatchPassword(userId, password);

    user.password = bcryptjs.hashSync(newPassword, config.salt);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async checkMatchPassword(useId: number, password: string) {
    const currentUserPass = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :useId', { useId })
      .select('user.password')
      .getRawOne();

    const validPass = bcryptjs.compareSync(
      password,
      currentUserPass.user_password,
    );

    if (!validPass) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }
}
