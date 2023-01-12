import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genre {
  @ApiProperty({
    description: 'Unique identificator',
    example: '1',
    nullable: false,
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Book genre',
    example: 'Fantasy',
    nullable: false,
    uniqueItems: true,
  })
  @Column({ type: 'varchar', nullable: false })
  name: string;
}
