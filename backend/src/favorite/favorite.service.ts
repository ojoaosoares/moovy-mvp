import { FavoriteRepository } from './favorite.repository';
import { Favorite } from './favorite.entity';

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;

  constructor(favoriteRepository?: FavoriteRepository) {
    this.favoriteRepository = favoriteRepository ?? new FavoriteRepository();
  }

  public async createFavorite(
    favoriteData: Partial<Favorite>,
  ): Promise<Favorite> {
    if (!favoriteData.imdbID || !favoriteData.Title) {
      throw new Error('All informations are required');
    }

    return this.favoriteRepository.createFavorite(favoriteData);
  }

  public async hasFavorite(imdbID: string): Promise<boolean> {
    return this.favoriteRepository.hasFavorite(imdbID);
  }

  public async getAllFavorites(): Promise<Favorite[]> {
    return this.favoriteRepository.getAllFavorites();
  }

  public async deleteFavorite(imdbID: string): Promise<string> {
    const result = await this.favoriteRepository.deleteFavoriteByimdbID(imdbID);
    if (!result) return 'Favorite not found';
    return 'Favorite deleted successfully';
  }
}
