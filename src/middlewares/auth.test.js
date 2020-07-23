import { connect, disconnect } from 'mongoose';
import { databaseURI, databaseOptions } from '#config/database';
import * as authMiddleware from '#middlewares/auth';
import tokenHelper from '#helper/token';
import userModel from '#models/user';

describe('Testing authentication middleware', () => {
  const userData = {
      email: 'test@gmail.com',
      password: 'testing123',
      name: 'testuser',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '2000-01-01',
    },
    mockRequest = {};

  beforeAll(async () => {
    await connect(databaseURI, databaseOptions);
    const { _id } = await userModel.create(userData);
    const token = tokenHelper.generateAccessToken({ userId: _id });
    mockRequest.headers = { authorization: `Bearer ${token}` };
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await disconnect();
  });

  it('Fetch token from auth header', () => {
    authMiddleware.fetchAccessTokenFromHeader(mockRequest, {}, () => {
      expect(mockRequest.token).not.toBeNull();
    });
  });

  it('Fetches user data as a request attribute', () => {
    authMiddleware.fetchUserData(mockRequest, {}, () => {
      expect(mockRequest.user).not.toBeNull();
      expect(mockRequest.user).not.toBeUndefined();
    });
  });

  it('Rejects non admin user', () => {
    mockRequest.user = { isAdmin: false };
    authMiddleware.isAdmin(mockRequest, {}, (err) => {
      expect(err).not.toBeNull();
    });
  });

  it('Tests all of the auth middleware together', async () => {
    authMiddleware.fetchAccessTokenFromHeader(mockRequest, {}, () => {
      expect(mockRequest.token).not.toBeNull();
      authMiddleware.fetchUserData(mockRequest, {}, () => {
        expect(mockRequest.user).not.toBeNull();
        authMiddleware.isAdmin(mockRequest, {}, (err) => {
          expect(err).not.toBeNull();
        });
      });
    });
  });
});
