import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [MovieModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
