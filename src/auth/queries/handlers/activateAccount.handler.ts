/* eslint-disable @typescript-eslint/indent */
import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivateAccountQuery } from '../impl';
import { User } from '../../../db/entities/user.entity';

@QueryHandler(ActivateAccountQuery)
export class ActivateAccountHandler
  implements IQueryHandler<ActivateAccountQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: ActivateAccountQuery) {
    const { activationLink } = query;
    const user = await this.userRepository.findOneBy({ activationLink });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.isActivated = true;
    await this.userRepository.save(user);
  }
}
