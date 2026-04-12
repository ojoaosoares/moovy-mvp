import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MovieDto } from './dto/movie.dto';
import { BoSearch, BoMovie } from './bo/movie.bo';
import { MovieMapper } from './movie.mapper';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import * as CacheManager from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

dotenv.config();

@Injectable()
export class MovieService {
  private readonly apiKey = process.env.IMDB_API_KEY;
  private movieMapper: MovieMapper;

  constructor(
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheManager.Cache,
  ) {
    this.movieMapper = new MovieMapper();
  }

  async searchMovies(query: string): Promise<MovieDto[]> {

    const cachedQuery = await this.cacheManager.get<MovieDto[]>(`query:${query}`);
    if (cachedQuery)
      return cachedQuery;


    const response = await firstValueFrom(
      this.http.get<BoSearch>(
        `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${query}`,
      ),
    );

    if (response.data.Response === 'False' || !response.data.Search) {
      return [];
    }

    const boSearch = response.data;

    const movies = await Promise.all(
      boSearch.Search.filter((item) => item.Type === 'movie').map(
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
      const ratingA = Number(a.imdbRating) || 0;
      const ratingB = Number(b.imdbRating) || 0;
      return ratingB - ratingA;
    });

    await this.cacheManager.set(`query:${query}`, uniqueMovies);
    return uniqueMovies;
  }

  async getMovie(imdbId: string): Promise<MovieDto> {

    const cachedMovie = await this.cacheManager.get<MovieDto>(`movie:${imdbId}`);
    if (cachedMovie) return cachedMovie;

    const response = await firstValueFrom(
      this.http.get<BoMovie>(
        `https://www.omdbapi.com/?apikey=${this.apiKey}&i=${imdbId}`,
      ),
    );

    if (response.data.Response === 'False') {
      throw new Error('Movie not found');
    }

    const boMovie = response.data;

    const movieDTO = this.movieMapper.fromBOtoDTO(boMovie);
    await this.cacheManager.set(`movie:${imdbId}`, movieDTO);
    return movieDTO;
  }
}
