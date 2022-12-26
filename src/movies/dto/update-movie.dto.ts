import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";


export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// 유효성검사를 하는곳
// 파셜타입을 적어주면 파셜타입 대상에서 부분적으로 받아도 ok하겠다는 뜻