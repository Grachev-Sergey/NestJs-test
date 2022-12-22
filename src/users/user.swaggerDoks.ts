import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/db/entities/user.entity';

export class UserReq {
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
}
