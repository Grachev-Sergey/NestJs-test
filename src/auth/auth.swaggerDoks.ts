import { ApiProperty } from '@nestjs/swagger';

import { User } from '../db/entities/user.entity';

type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export class AuthReq {
  @ApiProperty({
    example: {
      id: 1,
      createdAt: '2022-12-20T07:30:25.818Z',
      updatedAt: '2022-12-22T06:08:06.635Z',
      email: 'example@gmail.com',
      name: 'Bob',
      activationLink: 'a85714e9-0bb7-44f2-867e-e5be3518ead7',
      avatar:
        'http://localhost:4000/avatars/5555e0a3-147b-4121-8ff9-03b9e9b8c6c1.png',
      isActivated: true,
    },
  })
  user: User;
  @ApiProperty({
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjcxNzE4MzU4LCJleHAiOjE2NzE4MDQ3NTh9.iBNh24xt2T6UCqlkgjNLp0W-l7Mdjcc3PZ_aRJ7_T1U',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzMyNTY1MTIsImV4cCI6MTY3NDQ2NjExMn0.OoOY--QPjGfS7miCQA3GlN80nyDjHeH3EFne7RL2YzE',
    },
  })
  tokens: TokensType;
}

export class RefreshTokensReq {
  @ApiProperty({
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjcxNzE4MzU4LCJleHAiOjE2NzE4MDQ3NTh9.iBNh24xt2T6UCqlkgjNLp0W-l7Mdjcc3PZ_aRJ7_T1U',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzMyNTY1MTIsImV4cCI6MTY3NDQ2NjExMn0.OoOY--QPjGfS7miCQA3GlN80nyDjHeH3EFne7RL2YzE',
    },
  })
  tokens: TokensType;
}
