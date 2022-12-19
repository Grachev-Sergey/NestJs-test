import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
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

  async getOneUser(userId: string): Promise<User> {
    const id = Number(userId);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async deleteUser(userId: string) {
    const id = Number(userId);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.remove(user);
  }

  async updateUserEmail(
    dto: UpdateUserEmailDto,
    userId: string,
  ): Promise<User> {
    const { newEmail } = dto;
    const id = Number(userId);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.email = newEmail;
    await this.userRepository.save(user);
    return user;
  }

  async updateUserPass(dto: UpdateUserPasslDto, userId: string): Promise<User> {
    const { password, newPassword } = dto;
    const id = Number(userId);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const currentUserPass = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user.password')
      .getRawOne();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validPass = bcrypt.compareSync(
      password,
      currentUserPass.user_password,
    );

    if (!validPass) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    user.password = bcrypt.hashSync(newPassword, 5);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
