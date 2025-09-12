import { Controller, Get, Post, Delete, Query } from '@nestjs/common';
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

  @Post('/add')
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

  @Delete('/remove')
  async removeFavorite(
    @Query('id') id: string,
  ): Promise<{ message: string }> {
    try {
      const message = await this.favoriteService.deleteFavorite(id);
      return { message };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Error removing favorite');
    }
  }
}
