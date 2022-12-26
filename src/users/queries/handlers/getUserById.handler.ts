import { HttpException, HttpStatus } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const { userId } = query;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
