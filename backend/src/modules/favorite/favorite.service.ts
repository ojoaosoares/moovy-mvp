import { FavoriteRepository } from './favorite.repository';
import { FavoriteDTO, HasFavoriteDTO } from './dto/favorite.dto';
import { FavoriteMapper } from './favorite.mapper';

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;
  private favoriteMapper: FavoriteMapper;

  constructor(favoriteRepository?: FavoriteRepository) {
    this.favoriteRepository = favoriteRepository ?? new FavoriteRepository();
    this.favoriteMapper = new FavoriteMapper();
  }

  public async createFavorite(favoriteData: FavoriteDTO): Promise<FavoriteDTO> {
    if (!favoriteData.imdbID || !favoriteData.Title) {
      throw new Error('All informations are required');
    }

    const entity = await this.favoriteRepository.createFavorite(
      this.favoriteMapper.fromDTOtoEntity(favoriteData),
    );

    return this.favoriteMapper.fromEntitytoBO(entity);
  }

  public async hasFavorite(imdbID: string): Promise<HasFavoriteDTO> {
    const entity = await this.favoriteRepository.hasFavorite(imdbID);

    return this.favoriteMapper.fromEntitytoHasFavoriteDTO(entity);
  }

  public async getAllFavorites(): Promise<FavoriteDTO[]> {
    const favorites = await this.favoriteRepository.getAllFavorites();
    favorites.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return favorites.map((fav) => this.favoriteMapper.fromEntitytoDTO(fav));
  }

  public async deleteFavorite(imdbID: string): Promise<FavoriteDTO> {
    const entity = await this.favoriteRepository.hasFavorite(imdbID);

    if (!entity) {
      throw new Error(`Favorite with imdbID ${imdbID} not found`);
    }

    const deleted =
      await this.favoriteRepository.deleteFavoriteByimdbID(imdbID);

    if (!deleted) {
      throw new Error(`Favorite with imdbID ${imdbID} not deleted`);
    }

    return this.favoriteMapper.fromEntitytoDTO(entity);
  }

  public async saveAudio(
    imdbID: string,
    audioPath: string,
  ): Promise<FavoriteDTO> {
    const entity = await this.favoriteRepository.saveAudio(imdbID, audioPath);
    if (!entity) {
      throw new Error('Favorite not found');
    }
    return this.favoriteMapper.fromEntitytoDTO(entity);
  }
}
