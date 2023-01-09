/* eslint-disable @typescript-eslint/indent */
import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenQuery } from '../impl';
import { User } from '../../../db/entities/user.entity';
import { Utils } from '../../../utils';

@QueryHandler(RefreshTokenQuery)
export class RefreshTokenHandler implements IQueryHandler<RefreshTokenQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utils: Utils,
  ) {}

  async execute(query: RefreshTokenQuery) {
    const { refreshToken } = query;
    const user = await this.userRepository.findOneBy({ refreshToken });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const tokens = await this.utils.generateTokens(user.id);
    user.refreshToken = tokens.refreshToken;
    await this.userRepository.save(user);
    return tokens;
  }
}
