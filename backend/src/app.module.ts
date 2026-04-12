import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './modules/movie/movie.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MovieModule,
    FavoriteModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/audio',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
