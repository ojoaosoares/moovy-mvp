export class FavoriteDTO {
  imdbID: string;
  Title: string;
  Poster?: string;
  imdbRating?: string;
  audioPath?: string;
}

export class HasFavoriteDTO {
  favorite?: FavoriteDTO;
  hasFavorite: boolean;
}
