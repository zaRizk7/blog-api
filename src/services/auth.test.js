import { connect, disconnect } from 'mongoose';
import { databaseURI, databaseOptions } from '#config/database';
import userModel from '#models/user';
import sessionModel from '#models/session';
import authService from '#services/auth';

describe('Testing authentication service', () => {
  const userData = {
      email: 'test@gmail.com',
      password: 'testing123',
      name: 'testuser',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '2000-01-01',
    },
    { password } = userData;

  beforeAll(async () => {
    await connect(databaseURI, databaseOptions);
    await userModel.db.deleteMany();
    await sessionModel.db.deleteMany();
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await sessionModel.db.deleteMany();
    await disconnect();
  });

  it('Signs up user', async () => {
    const user = await authService.signup(userData);
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
  });

  it('Logs in user', async () => {
    userData.password = password;
    const loginUser = await authService.login(userData);
    expect(loginUser).not.toBeNull();
    expect(loginUser).not.toBeUndefined();
  });

  it('Refreshes user token', async () => {
    const { refreshToken } = await authService.login(userData);
    const refreshedToken = await authService.refresh({ refreshToken });
    expect(refreshedToken).not.toBeNull();
    expect(refreshedToken).not.toBeUndefined();
  });

  it('Logs out user', async () => {
    const loginUser = await authService.login(userData);
    const { refreshToken } = loginUser;
    const loggedOutUser = await authService.logout({ refreshToken });
    const { expiredSession } = loggedOutUser;
    const { isValid } = expiredSession;
    expect(isValid).not.toBeTruthy();
  });
});
