import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Comment } from './comments.entity';
import { Genre } from './genre.entity';

import { addUrl } from '../../utils/addUrl';

@Entity()
export class Book {
  @ApiProperty({
    description: 'Unique identificator',
    example: '1',
    nullable: false,
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The title of the cover image in the format .jpeg',
    example: 'The-Chronicles-of-Narnia.jpeg',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  cover: string;

  @ApiProperty({
    description: 'Title of the book',
    example: 'The Chronicles of Narnia',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty({
    description: 'Book author',
    example: 'C. S. Lewis',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  author: string;

  @ApiProperty({
    description: 'Book description',
    example:
      'The Chronicles of Narnia is a series of seven fantasy novels by British author ...',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Book date of issue',
    example: '1950',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  dateOfIssue: string;

  @ApiProperty({
    description: 'Having a hard cover',
    example: 'true',
    nullable: false,
  })
  @Column({ type: 'boolean', nullable: false })
  hardCover: boolean;

  @ApiProperty({
    description: 'Hardcover price',
    example: '12',
    nullable: false,
  })
  @Column({ type: 'float', nullable: true })
  hardCoverPrice: number;

  @ApiProperty({
    description: 'Soft cover available',
    example: 'true',
    nullable: false,
  })
  @Column({ type: 'boolean', nullable: false })
  paperback: boolean;

  @ApiProperty({
    description: 'Soft cover price',
    example: '8',
    nullable: false,
  })
  @Column({ type: 'float', nullable: true })
  paperbackPrice: number;

  @ApiProperty({
    description: 'Book status',
    example: 'Bestseller',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: true })
  status: string;

  @ApiProperty({
    description: 'Book rating',
    example: '3.5',
    nullable: false,
  })
  @Column({ type: 'float', nullable: false })
  rating: number;

  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];

  @ManyToMany(() => Genre, (genre) => genre.id, {
    eager: true,
  })
  @JoinTable()
  genre: Genre[];

  @AfterLoad()
  changingPathInResponse() {
    this.cover = addUrl(this.cover, 'booksCover');
  }
}
