import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/db/entities/user.entity';

export class CheckMatchPasswords {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async checkMatchPass(userId: number, password: string) {
    const currentUserPass = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .select('user.password')
      .getRawOne();

    const validPass = bcryptjs.compareSync(
      password,
      currentUserPass.user_password,
    );

    if (!validPass) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    return validPass;
  }
}
