import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { GetMeQuery } from '../impl';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  async execute(query: GetMeQuery) {
    const { user } = query;
    return { user };
  }
}
