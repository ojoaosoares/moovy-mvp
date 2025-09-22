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
  imdbRating?: string;
}
