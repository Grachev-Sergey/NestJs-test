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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  cover: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  dateOfIssue: string;

  @Column({ type: 'boolean', nullable: false })
  hardCover: boolean;

  @Column({ type: 'float', nullable: true })
  hardCoverPrice: number;

  @Column({ type: 'boolean', nullable: false })
  paperback: boolean;

  @Column({ type: 'float', nullable: true })
  paperbackPrice: number;

  @Column({ type: 'varchar', nullable: true })
  status: string;

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
