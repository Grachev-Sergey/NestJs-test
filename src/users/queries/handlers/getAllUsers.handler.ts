import { HttpException, HttpStatus } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';

import { GetAllUsersQuery } from '../impl';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    if (!allUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return allUsers;
  }
}
