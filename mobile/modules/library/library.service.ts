import { FavoriteDTO, HasFavoriteDTO } from '../../types';

export class LibraryService {
  async getFavorites(): Promise<HasFavoriteDTO[]> {
    const response = await fetch('http://10.0.2.2:4000/favorites');
    const data: FavoriteDTO[] = await response.json();

    return data.map((movie) => ({
      favorite: movie,
      hasFavorite: true,
    }));
  }
}
