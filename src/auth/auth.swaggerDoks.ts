import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/db/entities/user.entity';

export class AuthReq {
  @ApiProperty({
    example: {
      id: 1,
      createdAt: '2022-12-20T07:30:25.818Z',
      updatedAt: '2022-12-22T06:08:06.635Z',
      email: 'example@gmail.com',
      name: 'Bob',
    },
  })
  user: User;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjcxNzE4MzU4LCJleHAiOjE2NzE4MDQ3NTh9.iBNh24xt2T6UCqlkgjNLp0W-l7Mdjcc3PZ_aRJ7_T1U',
  })
  token: string;
}
// fix user and token
