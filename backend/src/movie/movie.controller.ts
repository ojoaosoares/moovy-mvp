import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movie.service';
import { MovieDto } from './movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async search(@Query('q') query: string): Promise<MovieDto[]> {
    return this.moviesService.searchMovies(query);
  }
}
