import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../../app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const version = process.env.API_VERSION;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', () => {
    return request(`http://localhost:${3000}`)
      .post(`/${version}/auth/login`)
      .send({ email: 'test', password: 'test' })
      .expect(401);
  });

  // it('/users/:id (DELETE)', async () => {
  //   const createUserResponse = await request(app.getHttpServer())
  //     .post('/users')
  //     .send({ username: 'test', password: 'test' })
  //     .expect(201);
  //
  //   const userId = createUserResponse.body.id;
  //
  //   return request(app.getHttpServer())
  //     .delete(`/users/${userId}`)
  //     .expect(200);
  // });
});
