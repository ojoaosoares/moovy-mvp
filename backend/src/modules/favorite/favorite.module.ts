import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { AppDataSource } from '../../utils/database/db';

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    {
      provide: 'DATA_SOURCE',
      useValue: AppDataSource,
    },
  ],
  exports: ['DATA_SOURCE'],
})
export class FavoriteModule {}
