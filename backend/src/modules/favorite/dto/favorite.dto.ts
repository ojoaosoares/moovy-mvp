import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class FavoriteDTO {
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
