import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // 잘못된 내용을 제외하고 요청을 받음
      forbidNonWhitelisted: true,   // 잘못된 녀석이 오면 요청 자체를 막아버림
      transform: true,              // 받은 요청을 우리가 원하는 타입으로 변환해줌
  }))          
  await app.listen(3000);
}
bootstrap();

// main.ts의 이름은 바뀌면 안된다.

// 밸리데이션파이프를 써줘야 dto사용가능

// 보니까 번역이 좀 어려워서 예시를 보는 게 이해가 빠르실 거예요
// 1. whitelist: true
// 클라이언트 측에서 전송한 데이터가 다음과 같을 경우
// {
// 　 "title": "Tenet",
// 　 "year": 2020,
// 　 "genres": ["Action", "Sci-Fi"],
// 　 "hack": "by me"
// }
// whitelist: true 로 설정했을 때 아래와 같이 데코레이터가 없는 속성("hack")은 제거되어 저장됩니다.
// {
// 　 id: 1,
// 　 title: 'Tenet',
// 　 year: 2020,
// 　 genres: ['Action', 'Sci-Fi'],
// }
// 2. forbidNonWhitelisted: true
// 클라이언트 측에서 전송한 데이터가 다음과 같을 경우
// {
// 　 "title": "Tenet",
// 　 "year": 2020,
// 　 "genres": ["Action", "Sci-Fi"],
// 　 "hack": "by me"
// }
// "hack"이라는 속성은 화이트리스트에 존재하지 않으므로 HttpException 을 던집니다.
// response :
// {
// 　 "statusCode": 400,
// 　 "message": [ "property hack should not exist" ],
// 　 "error": "Bad Request"
// }