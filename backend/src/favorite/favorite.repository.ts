import { AppDataSource } from '../utils/database/db';
import { Favorite } from './favorite.entity';

export class FavoriteRepository {
  private db = AppDataSource.getRepository(Favorite);

  public async createFavorite(
    favoriteData: Partial<Favorite>,
  ): Promise<Favorite> {
    const favorite = this.db.create(favoriteData);
    await this.db.save(favorite);

    return favorite;
  }

  public async getAllFavorites(): Promise<Favorite[]> {
    return this.db.find();
  }

  public async deleteFavoriteByimdbID(imdbID: string): Promise<boolean> {
    const result = await this.db.delete({ imdbID });
    return result.affected === 0;
  }
}
