import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { User } from '../db/entities/user.entity';
import config from '../config';

export class Utils {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async generateTokens(id: number) {
    const payload = { id };
    const accessToken = this.jwtService.sign(payload, {
      secret: config.token.access.secretKey,
      expiresIn: config.token.access.expiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: config.token.refresh.secretKey,
      expiresIn: config.token.refresh.expiresIn,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
