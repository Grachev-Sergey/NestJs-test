import { Test } from '@nestjs/testing';
import { TEST_USER } from '../../../utils/testConstants';
import { GetMeHandler } from './getMe.handler';

import type { GetMeQuery } from '../impl';

describe('get me', () => {
  let getMe: GetMeHandler;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GetMeHandler],
    }).compile();
    getMe = module.get(GetMeHandler);
  });
  it('should be defined', () => {
    expect(getMe).toBeDefined();
  });
  it('must return user', async () => {
    const mockedQuery: GetMeQuery = { user: TEST_USER };
    const response = await getMe.execute(mockedQuery);
    expect(response.user.id).toEqual(TEST_USER.id);
  });
});
