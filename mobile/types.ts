export interface FavoriteDTO {
  imdbID: string;
  title: string;
  poster?: string;
  imdbRating?: string;
  audioPath?: string;
}

export interface HasFavoriteDTO {
  favorite: FavoriteDTO;
  hasFavorite: boolean;
}
