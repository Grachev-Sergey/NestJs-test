import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  name: string;

  @ApiProperty({
    description: 'Password',
    example: '1q2w3e',
    nullable: false,
  })
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;
}
