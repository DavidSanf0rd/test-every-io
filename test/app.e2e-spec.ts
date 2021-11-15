import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('authenticates a user and retrieve a jwt token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Sanford', password: 'sanford' })
      .expect(201);
      
      jwtToken = response.body.access_token;
      expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  });

  it('fails to authenticate with a wrong password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Sanford', password: 'wrong' })
      .expect(401);
  });

  it('fails to authenticate with a wrong user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Mellow', password: 'sanford' })
      .expect(401);
  });

  it('fails to get tasks without a logged user', async () => {
    const response = await request(app.getHttpServer())
    .get('/task')
    .expect(401);
  })

  it('get tasks of a logged user', async () => {
    const response = await request(app.getHttpServer())
    .get('/task')
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(200);
  })






});
