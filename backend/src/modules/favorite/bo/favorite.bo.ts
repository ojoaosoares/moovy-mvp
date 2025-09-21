export class FavoriteBO {
  imdbID: string;
  Title: string;
  Poster?: string;
  imdbRating?: string;
  audioPath?: string;
}

export class HasFavoriteBO {
  favorite?: FavoriteBO;
  hasFavorite: boolean;
}
