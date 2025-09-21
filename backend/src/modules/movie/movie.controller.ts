import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search')
  async search(
    @Query('q') query: string,
  ): Promise<{ movies?: MovieDto[]; error?: string }> {
    try {
      const movies = await this.movieService.searchMovies(query);
      if (movies.length === 0) {
        return { error: 'No movies found' };
      }
      return { movies };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { error: err.message };
      }
      throw new Error('Error searching for movies');
    }
  }
}
