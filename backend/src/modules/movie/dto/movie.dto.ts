import { IsString, IsOptional } from 'class-validator';

export class MovieDto {
  @IsString()
  imdbID: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsString()
  imdbRating?: string;
}
