/* eslint-disable @typescript-eslint/indent */
import type { IQueryHandler } from '@nestjs/cqrs';
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

  async execute(query: ActivateAccountQuery): Promise<User[]> {
    const { activationLink } = query;
    // eslint-disable-next-line no-console
    console.log(activationLink);
    const allUsers = await this.userRepository.find();
    return allUsers;
  }
}
