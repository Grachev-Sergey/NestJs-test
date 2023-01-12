import { ApiProperty } from '@nestjs/swagger';

import { Genre } from '../db/entities/genre.entity';

export class AllGenresReq {
  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Fantasy',
      },
      {
        id: 2,
        name: 'Childrens',
      },
    ],
  })
  genrees: Genre;
}
