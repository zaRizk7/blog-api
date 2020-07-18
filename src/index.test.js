import { connect, disconnect } from 'mongoose';
import supertest from 'supertest';
import app from '#core/app';
import { databaseURI, databaseConfig } from '#core/config';

describe('Testing entire backend', () => {
  const requestListener = supertest(app);

  beforeAll(async () => {
    await connect(databaseURI, databaseConfig);
  });

  afterAll(async () => {
    await disconnect();
  });

  it('Should response with status code 200', async () => {
    const { status } = await requestListener.get('/api/v1/test');
    expect(status).toBe(200);
  });
});
