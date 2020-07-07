import request from 'supertest';
import app from '../src/app';

it('Returns request status 200', async function () {
  const req = await request(app).get('/');
  expect(req.status).toBe(200);
});
