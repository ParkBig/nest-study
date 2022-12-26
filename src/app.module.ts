import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],    // 모듈화를 통해 깔끔하게
  controllers: [AppController],            // url을 가져오고 함수를 실행한다. 라우터라고 생각할 수 있다.
  providers: [],
})
export class AppModule {}

// @ 시작은 데코레이터 라는 것이다.
// 데코레이터는 클래스에 함수 기능을 추가 할 수 있다.

// 터미널에 nest g ~~~ 를 통해 컨트롤러, 프로바이더 생성 가능