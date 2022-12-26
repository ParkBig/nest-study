import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // 원래 beforeEach 였는데 beforeAll로 바꿈 이유 => 
    // 원래는 각 테스트마다 app을 계속 생성하고 꺼지고 반복, 하지만 위처럼 바꾸면 한번만 생성해서 하위 테스트들 테스트 가능.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,              // 잘못된 내용을 제외하고 요청을 받음
        forbidNonWhitelisted: true,   // 잘못된 녀석이 오면 요청 자체를 막아버림
        transform: true,              // 받은 요청을 우리가 원하는 타입으로 변환해줌
    }))    
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie api');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([])
    });

    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "TEST",
          year: 2000,
          genres: ['TEST'],
        })
        .expect(201)
    });
    it("POST 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "TEST",
          year: 2000,
          genres: ['TEST'],
          other:"thing"
        })
        .expect(400)
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404)
    });
  });

  describe("/movies/:id", () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({title:"updada"})
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .expect(200);
    });
  })
});
