export interface MovieDto {
  imdbID: string;
  Title: string;
  Poster?: string;
  imdbRating?: string;
}

export interface FavoriteDTO {
  imdbID: string;
  Title: string;
  Poster?: string;
  imdbRating?: string;
  audioPath?: string;
}

export interface HasFavoriteDTO {
  favorite?: FavoriteDTO;
  hasFavorite: boolean;
}
