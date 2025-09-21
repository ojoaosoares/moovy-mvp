import { AppDataSource } from '../../utils/database/db';
import { FavoriteBO } from './bo/favorite.bo';
import { FavoriteEntity } from './entity/favorite.entity';

export class FavoriteRepository {
  private db = AppDataSource.getRepository(FavoriteEntity);

  public async createFavorite(
    favoriteData: FavoriteBO,
  ): Promise<FavoriteEntity> {
    const favorite = this.db.create(favoriteData);
    await this.db.save(favorite);

    return favorite;
  }

  public async hasFavorite(imdbID: string): Promise<FavoriteEntity | null> {
    const favorite = await this.db.findOne({ where: { imdbID } });
    return favorite ?? null;
  }

  public async getAllFavorites(): Promise<FavoriteEntity[]> {
    return this.db.find();
  }

  public async saveAudio(
    imdbID: string,
    audioPath: string,
  ): Promise<FavoriteEntity | null> {
    const favorite = await this.db.findOneBy({ imdbID });
    if (!favorite) return null;

    favorite.audioPath = audioPath;
    return this.db.save(favorite);
  }

  public async deleteFavoriteByimdbID(imdbID: string): Promise<boolean> {
    const result = await this.db.delete({ imdbID });
    return result.affected !== 0;
  }
}
