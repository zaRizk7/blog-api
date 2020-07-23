import { connect, disconnect } from 'mongoose';
import { databaseURI, databaseOptions } from '#config/database';
import userModel from '#models/user';
import sessionModel from '#models/session';

describe('Testing session model CRUD', () => {
  const userData = {
      email: 'test@gmail.com',
      password: 'testing123',
      name: 'testuser',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '2000-01-01',
    },
    sessionData = {};
  let user, session;

  beforeAll(async () => {
    await connect(databaseURI, databaseOptions);
    await userModel.db.deleteMany();
    await sessionModel.db.deleteMany();
    user = await userModel.create(userData);
    sessionData.user = user;
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await sessionModel.db.deleteMany();
    await disconnect();
  });

  it('Creates new session', async () => {
    session = await sessionModel.create(sessionData);
    expect(session).not.toBeNull();
  });

  it('Fetches the session', async () => {
    session = await sessionModel.readById(session._id);
    expect(session).not.toBeNull();
  });

  it('Updates the session', async () => {
    const updatedData = { isValid: true };
    const { isValid } = await sessionModel.update(session._id, updatedData);
    expect(isValid).toBeTruthy();
  });

  it('Deletes the session', async () => {
    const { _id } = await sessionModel.delete(session._id);
    expect(session._id).toStrictEqual(_id);
  });
});
