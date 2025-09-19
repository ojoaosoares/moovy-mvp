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

  public async hasFavorite(imdbID: string): Promise<boolean> {
    const count = await this.db.count({ where: { imdbID } });
    return count > 0;
  }

  public async getAllFavorites(): Promise<Favorite[]> {
    return this.db.find();
  }

  public async deleteFavoriteByimdbID(imdbID: string): Promise<boolean> {
    const result = await this.db.delete({ imdbID });
    return result.affected === 0;
  }

  public async saveAudio(
    imdbID: string,
    audioPath: string,
  ): Promise<Favorite | null> {
    const favorite = await this.db.findOneBy({ imdbID });
    if (!favorite) return null;

    favorite.audioPath = audioPath;
    await this.db.save(favorite);
    return favorite;
  }
}
