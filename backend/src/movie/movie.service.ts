import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MovieDto, OmdbMovieResponse, OmdbSearchResponse } from './movie.dto';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class MoviesService {
  private readonly apiKey = process.env.IMDB_API_KEY;

  constructor(private readonly http: HttpService) {}

  async searchMovies(query: string): Promise<MovieDto[]> {
    const response = await firstValueFrom(
      this.http.get<OmdbSearchResponse>(
        `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${query}`,
      ),
    );

    if (response.data.Response === 'False' || !response.data.Search) {
      throw new Error('No movies found');
    }

    return Promise.all(
      response.data.Search.filter((item) => item.Type === 'movie').map((item) =>
        this.getMovie(item.imdbID),
      ),
    );
  }

  async getMovie(imdbId: string): Promise<MovieDto> {
    const response = await firstValueFrom(
      this.http.get<OmdbMovieResponse>(
        `https://www.omdbapi.com/?apikey=${this.apiKey}&i=${imdbId}`,
      ),
    );

    if (response.data.Response === 'False') {
      throw new Error('Movie not found');
    }

    return {
      imdbID: response.data.imdbID,
      Title: response.data.Title,
      Poster: response.data.Poster,
      imdbRating: response.data.imdbRating,
    } as MovieDto;
  }
}
