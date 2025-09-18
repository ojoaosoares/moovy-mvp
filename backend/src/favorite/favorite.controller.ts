import { Controller, Get, Post, Delete, Param, UploadedFile,
  UseInterceptors,
  BadRequestException } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.entity';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('/')
  async getFavorites(): Promise<{ favorites: Partial<Favorite>[] }> {
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

  @Post('audio/:imdbID')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileExt = extname(file.originalname);
          cb(null, `audio_${req.params.imdbID}${fileExt}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('audio/')) {
          return cb(new BadRequestException('Only audio files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAudio(
    @Param('imdbID') imdbID: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Entrou no saveAudio', file);
    if (!file) throw new BadRequestException('File not uploaded');
    return this.favoriteService.saveAudio(imdbID, file.filename);
  }
}
