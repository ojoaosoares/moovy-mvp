export class FavoriteBO {
  imdbID: string;
  title: string;
  poster?: string;
  imdbRating?: string;
  audioPath?: string;
}

export class HasFavoriteBO {
  favorite?: FavoriteBO;
  hasFavorite: boolean;
}
