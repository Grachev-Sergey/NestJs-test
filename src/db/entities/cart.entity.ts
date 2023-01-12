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
export class Cart {
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
    description: 'Type of book cover',
    example: 'hardCover',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  bookCover: string;

  @ApiProperty({
    description: 'Book price',
    example: '8',
    nullable: false,
  })
  @Column({ type: 'float', nullable: false })
  price: number;

  @ApiProperty({
    description: 'Number of copies',
    example: '2',
    default: '1',
    nullable: false,
  })
  @Column({ type: 'real', nullable: false, default: 1 })
  numberOfCopies: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
