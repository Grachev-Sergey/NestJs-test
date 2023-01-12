import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Cart } from './cart.entity';
import { Favorite } from './favorite.entity';
import { Rating } from './rating.entity';

import { addUrl } from '../../utils/addUrl';

@Entity()
export class User {
  @ApiProperty({
    description: 'Unique identificator',
    example: '1',
    nullable: false,
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Time of creation',
    example: '2022-12-20T07:30:25.818Z',
    nullable: false,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Update time',
    example: '2022-12-20T07:30:25.818Z',
    nullable: false,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Email address',
    example: 'example@gmail.com',
    nullable: false,
  })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Name',
    example: 'Bob',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @ApiProperty({
    description: 'Password',
    example: '1q2w3e',
    nullable: false,
  })
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    nullable: false,
  })
  // do it nullable true
  @Column({ type: 'varchar', select: false, nullable: false })
  refreshToken: string;

  @ApiProperty({
    description: 'Activation link',
    example: 'a52a277a-cd73-459e-af4a-400613000263',
    nullable: false,
  })
  @Column({ type: 'varchar', select: false, nullable: false })
  activationLink: string;

  @ApiProperty({
    description: 'Is the account activated',
    example: true,
    default: false,
  })
  @Column({ type: 'boolean', select: false, default: false })
  isActivated: boolean;

  @ApiProperty({
    description: 'Avatar',
    example: 'a52a277a-cd73-459e-af4a-400613000263',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @ApiProperty({
    description: 'Rated books',
    example: new Rating(),
    nullable: true,
  })
  @OneToMany(() => Rating, (rating) => rating.user)
  rating: Rating[];

  @ApiProperty({
    description: 'Books in favorites',
    example: new Favorite(),
    nullable: true,
  })
  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];

  @ApiProperty({
    description: 'Books in cart',
    example: new Cart(),
    nullable: true,
  })
  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @AfterLoad()
  changingPathInResponse() {
    this.avatar = addUrl(this.avatar, 'avatars');
  }
}
