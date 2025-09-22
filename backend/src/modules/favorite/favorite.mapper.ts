import { FavoriteBO, HasFavoriteBO } from './bo/favorite.bo';
import { FavoriteDTO, HasFavoriteDTO } from './dto/favorite.dto';
import { FavoriteEntity } from './entity/favorite.entity';

export class FavoriteMapper {
  fromDTOtoBO(dto: FavoriteDTO): FavoriteBO {
    const bo = new FavoriteBO();
    bo.title = dto.title;
    bo.poster = dto.poster;
    bo.imdbRating = dto.imdbRating;
    bo.imdbID = dto.imdbID;
    bo.audioPath = dto.audioPath ? dto.audioPath : undefined;
    return bo;
  }

  fromBOtoDTO(bo: FavoriteBO): FavoriteDTO {
    const dto = new FavoriteDTO();
    dto.poster = bo.poster;
    dto.title = bo.title;
    dto.imdbRating = bo.imdbRating;
    dto.imdbID = bo.imdbID;
    dto.audioPath = bo.audioPath ? bo.audioPath : undefined;
    return dto;
  }

  fromBOtoEntity(bo: FavoriteBO): FavoriteEntity {
    const entity = new FavoriteEntity();
    entity.poster = bo.poster;
    entity.title = bo.title;
    entity.imdbRating = bo.imdbRating;
    entity.imdbID = bo.imdbID;
    entity.audioPath = bo.audioPath ? bo.audioPath : undefined;
    return entity;
  }

  fromEntitytoBO(entity: FavoriteEntity): FavoriteBO {
    const bo = new FavoriteBO();
    bo.poster = entity.poster;
    bo.title = entity.title;
    bo.imdbRating = entity.imdbRating;
    bo.imdbID = entity.imdbID;
    bo.audioPath = entity.audioPath ? entity.audioPath : undefined;
    return bo;
  }

  fromEntitytoDTO(entity: FavoriteEntity): FavoriteDTO {
    const bo = this.fromEntitytoBO(entity);
    const dto = this.fromBOtoDTO(bo);
    return dto;
  }

  fromDTOtoEntity(dto: FavoriteDTO): FavoriteEntity {
    const bo = this.fromDTOtoBO(dto);
    const entity = this.fromBOtoEntity(bo);
    return entity;
  }

  fromEntitytoHasFavoriteBO(entity: FavoriteEntity | null): HasFavoriteBO {
    const bo = new HasFavoriteBO();
    bo.favorite = entity ? this.fromEntitytoBO(entity) : undefined;
    bo.hasFavorite = !!entity;
    return bo;
  }

  fromEntitytoHasFavoriteDTO(entity: FavoriteEntity | null): HasFavoriteDTO {
    const dto = new HasFavoriteDTO();
    dto.favorite = entity ? this.fromEntitytoDTO(entity) : undefined;
    dto.hasFavorite = !!entity;
    return dto;
  }
}
