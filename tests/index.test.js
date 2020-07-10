import request from 'supertest';
import app from '#core/app';

it('Returns request status 200', async () => {
  const req = await request(app).get('/');
  expect(req.status).toBe(200);
});
