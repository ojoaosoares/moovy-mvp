import 'reflect-metadata';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { FavoriteService } from './favorite.service';
import { FavoriteEntity } from './entity/favorite.entity';
import { AppDataSource } from '../../utils/database/db';
import { FavoriteDTO } from './dto/favorite.dto';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeAll(async () => {
    await AppDataSource.initialize();
    service = new FavoriteService();
  });

  afterAll(async () => {
    await AppDataSource.getRepository(FavoriteEntity).clear();
    await AppDataSource.destroy();
  });

  it('FavoriteService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFavorite', () => {
    it('should throw if required data is missing', async () => {
      await expect(
        service.createFavorite({ Title: 'The Avengers' } as FavoriteEntity),
      ).rejects.toThrow('All informations are required');
    });

    it('should create a favorite and persist it', async () => {
      const favoriteData = new FavoriteEntity();
      favoriteData.imdbID = 'tt0848229';
      favoriteData.Title = 'The Avengers 2: Age of Ultron';
      favoriteData.imdbRating = '7';
      favoriteData.Poster = 'https://test.poster';
      favoriteData.audioPath = undefined;

      const favorite = await service.createFavorite(favoriteData);

      expect(favorite.imdbID).toBe(favoriteData.imdbID);
      expect(favorite.Title).toBe(favoriteData.Title);

      const found = await AppDataSource.getRepository(FavoriteEntity).findOneBy(
        {
          imdbID: favoriteData.imdbID,
        },
      );
      expect(found).toBeDefined();
      expect(found?.Title).toBe(favoriteData.Title);
    });
  });

  describe('getAllFavorites', () => {
    it('should return an array of favorites', async () => {
      const favorites = await service.getAllFavorites();
      expect(favorites).toBeInstanceOf(Array);

      if (favorites.length > 0) {
        expect(favorites[0]).toBeInstanceOf(FavoriteDTO);
      }
    });
  });

  describe('deleteFavorite', () => {
    it('should delete a favorite by imdbID and return the deleted entity', async () => {
      const entity = await service.deleteFavorite('tt0848229');
      expect(entity).toBeInstanceOf(FavoriteDTO);
      const found = await AppDataSource.getRepository(FavoriteEntity).findOneBy(
        {
          imdbID: 'tt0848229',
        },
      );
      expect(found).toBeNull();
    });
  });
});
