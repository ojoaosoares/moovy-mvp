export class FavoriteBO {
  imdbID: string;
  Title: string;
  title?: string;
  imdbRating?: string;
  audioPath?: string;
}

export class HasFavoriteBO {
  favorite?: FavoriteBO;
  hasFavorite: boolean;
}
