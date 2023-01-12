import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class Favorite {
  @ApiProperty({
    description: 'Unique identificator',
    example: '1',
    nullable: false,
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Book Id',
    example: '1',
    nullable: false,
  })
  @Column({ type: 'integer', nullable: false })
  bookId: number;

  @ApiProperty({
    description: 'User Id',
    example: '1',
    nullable: false,
  })
  @Column({ type: 'integer', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
