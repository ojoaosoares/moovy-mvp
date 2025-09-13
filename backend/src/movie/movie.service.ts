import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MovieDto, OmdbMovieResponse, OmdbSearchResponse } from './movie.dto';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MovieService {
  private readonly apiKey = process.env.IMDB_API_KEY;

  constructor(private readonly http: HttpService) {}

  async searchMovies(query: string): Promise<MovieDto[]> {
  const response = await firstValueFrom(
    this.http.get<OmdbSearchResponse>(
      `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${query}`,
    ),
  );

  if (response.data.Response === 'False' || !response.data.Search) {
    return [];
  }

  const movies = await Promise.all(
    response.data.Search.filter((item) => item.Type === 'movie').map(
      async (item) => {
        try {
          return await this.getMovie(item.imdbID);
        } catch {
          return null;
        }
      },
    ),
  );

  const filtered = movies.filter((m): m is MovieDto => m !== null);

  const uniqueMovies = Array.from(
    new Map(filtered.map((m) => [m.imdbID, m])).values(),
  );

  uniqueMovies.sort((a, b) => {
    const ratingA = Number(a.imdbRating) || 0; // N/A or empty becomes 0
    const ratingB = Number(b.imdbRating) || 0;
    return ratingB - ratingA; // descending order
  });
  return uniqueMovies;
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
