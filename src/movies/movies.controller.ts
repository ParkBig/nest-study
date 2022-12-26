import { Controller, Get, Post, Delete, Param, Patch, Body, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get("search")
  search(@Query("year") searchingYear: string) {
    return `we are searching for a movie made after: ${searchingYear}`
  }

  @Get(":id")
  getOne(@Param("id") movieId: number): Movie { // @Param은 url에 있는 특정 타겟(id)을 가져오겠다는 뜻. 그리고 movieId라는 변수에 저장.
    return this.moviesService.getOne(movieId);
  }
  
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(":id")
  remove(@Param("id") movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(":id")
  path(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}

// 참고 when @Query(Query Parameter) or @Param
// 만약 어떤 resource를 식별하고 싶으면 Path Variable을 사용하고,
// // 정렬이나 필터링을 한다면 Query Parameter를 사용하는 것이 Best Practice이다.

// Param은 요청 주소에 포함되어있는 변수를 담아요.
// 예를 들어서 localhost:3000/movie/4546 과 같은 주소가 있다면 4546을 담게 되고,
// Query는 주소 이후에 "?" 뒤에 있는 변수를 담게 됩니다.
// 예를 들어서 localhost:3000/movie/search?year=2020일 경우에 2020을 담게 되는거에요!