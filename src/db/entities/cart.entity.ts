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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  bookId: number;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @Column({ type: 'varchar', nullable: false })
  bookCover: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'real', nullable: false, default: 1 })
  numberOfCopies: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}