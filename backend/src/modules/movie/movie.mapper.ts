import { MovieDto } from './dto/movie.dto';
import { BoMovie } from './bo/movie.bo';

export class MovieMapper {
  fromBOtoDTO(bo: BoMovie): MovieDto {
    const dto = new MovieDto();
    dto.imdbID = bo.imdbID;
    dto.Title = bo.Title;
    dto.Poster = bo.Poster;
    dto.imdbRating = bo.imdbRating;
    return dto;
  }
}
