import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { FavoriteEntity } from '../../modules/favorite/entity/favorite.entity';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [FavoriteEntity],
  migrations: [],
  subscribers: [],
});
