import { connect, disconnect } from 'mongoose';
import supertest from 'supertest';
import app from '#core/app';
import { databaseURI, databaseOptions } from '#config/database';

describe('Testing entire backend', () => {
  const requestListener = supertest(app);

  beforeAll(async () => {
    await connect(databaseURI, databaseOptions);
  });

  afterAll(async () => {
    await disconnect();
  });

  it('Should response with status code 200', async () => {
    const { status } = await requestListener.get('/api/v1/test');
    expect(status).toBe(200);
  });
});
