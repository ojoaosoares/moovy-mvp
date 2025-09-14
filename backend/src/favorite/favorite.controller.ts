import { Controller, Get, Post, Delete, Query, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.entity';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('/')
  async getFavorites(): Promise<{ favorites: Favorite[] }> {
    try {
      const favorites = await this.favoriteService.getAllFavorites();
      return { favorites };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Error fetching favorites');
    }
  }

  @Get('/:imdbID')
  async isFavorite(
    @Param('imdbID') imdbID: string,
  ): Promise<{ isFavorite: boolean }> {
    try {
      const isFavorite = await this.favoriteService.hasFavorite(imdbID);
      return { isFavorite };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Error checking favorite status');
    }
  }

  @Post('/')
  async addFavorite(
    @Body() favoriteDto: Partial<Favorite>,
  ): Promise<{ favorite: Favorite }> {
    try {
      const favorite = await this.favoriteService.createFavorite(favoriteDto);
      return { favorite };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Error adding favorite');
    }
  }

  @Delete('/:imdbID')
  async removeFavorite(
    @Param('imdbID') imdbID: string,
  ): Promise<{ message: string }> {
    try {
      const message = await this.favoriteService.deleteFavorite(imdbID);
      return { message };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Error removing favorite');
    }
  }
}
