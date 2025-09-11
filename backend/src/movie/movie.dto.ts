// create-movie.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class MovieDto {
  @IsString()
  imdbID: string;

  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Poster?: string;

  @IsOptional()
  @IsString()
  imdbRating: string;
}

export interface OmdbSearchResponse {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: string;
  Response: string;
}

export interface OmdbMovieResponse {
  imdbID: string;
  Title: string;
  Poster?: string;
  imdbRating: string;
  Response: string;
}
