import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class Rating {
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

  @ApiProperty({
    description: 'Book rating',
    example: '3.5',
    nullable: false,
  })
  @Column({ type: 'real', nullable: false })
  rating: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
