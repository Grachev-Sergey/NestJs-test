/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/db/entities/user.entity';

import { GetUserByEmailQuery } from '../impl';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    const { email } = query;
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
