import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  imdbID: string;

  @Column('text')
  Title: string;

  @Column('text', { nullable: true })
  Poster?: string;

  @Column('text', { nullable: true })
  imdbRating?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
