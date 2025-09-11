import { Module } from '@nestjs/common';
import { MoviesController } from './movie.controller';
import { MoviesService } from './movie.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MovieModule {}
