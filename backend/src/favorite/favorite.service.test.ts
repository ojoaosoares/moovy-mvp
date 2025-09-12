import 'reflect-metadata';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.entity';
import { AppDataSource } from '../utils/database/db';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeAll(async () => {
    await AppDataSource.initialize();
    service = new FavoriteService();
  });

  afterAll(async () => {
    await AppDataSource.getRepository(Favorite).clear();
    await AppDataSource.destroy();
  });

  it('FavoriteService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFavorite', () => {
    it('should throw if required data is missing', async () => {
      await expect(
        service.createFavorite({ Title: 'The Avengers' } as Partial<Favorite>)
      ).rejects.toThrow('All informations are required');
    });

    it('should create a favorite and persist it', async () => {
      const favoriteData = {
        imdbID: 'tt0848229',
        Title: 'The Avengers 2: Age of Ultron',
        imdbRating: '10',
        Poster: 'https://test.poster',
      };

      const favorite = await service.createFavorite(favoriteData);

      expect(favorite.imdbID).toBe(favoriteData.imdbID);
      expect(favorite.Title).toBe(favoriteData.Title);

      const found = await AppDataSource.getRepository(Favorite).findOneBy({
        imdbID: favoriteData.imdbID,
      });
      expect(found).toBeDefined();
      expect(found?.Title).toBe(favoriteData.Title);
    });
  });

  describe('getAllFavorites', () => {
    it('should return an array of favorites', async () => {
      const favorites = await service.getAllFavorites();
      expect(favorites).toBeInstanceOf(Array);
      expect(favorites[0]).toBeInstanceOf(Favorite);
    });
  });

  describe('deleteFavorite', () => {
    it('should delete a favorite by imdbID and return message', async () => {
      const message = await service.deleteFavorite("tt0848229");
      expect(message).toMatch(/deleted successfully|not found/);

      const found = await AppDataSource.getRepository(Favorite).findOneBy({
        imdbID: "tt0848229",
      });
      expect(found).toBeNull();
    });
  });
});
