import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  imdbID: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  poster?: string;

  @Column('text', { nullable: true })
  imdbRating?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column('text', { nullable: true })
  audioPath?: string;
}
