import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class FavoriteDTO {
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

  @IsOptional()
  @IsString()
  audioPath?: string;
}

export class HasFavoriteDTO {
  @IsOptional()
  favorite?: FavoriteDTO;

  @IsBoolean()
  hasFavorite: boolean;
}
