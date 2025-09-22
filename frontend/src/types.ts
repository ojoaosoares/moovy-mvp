export interface MovieDto {
  imdbID: string;
  title: string;
  poster?: string;
  imdbRating?: string;
}

export interface FavoriteDTO {
  imdbID: string;
  title: string;
  poster?: string;
  imdbRating?: string;
  audioPath?: string;
}

export interface HasFavoriteDTO {
  favorite?: FavoriteDTO;
  hasFavorite: boolean;
}
