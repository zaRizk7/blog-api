import { connect, disconnect } from 'mongoose';
import { databaseURI, databaseOptions } from '#config/database';
import userModel from '#models/user';

describe('Testing user model CRUD', () => {
  const userData = {
    email: 'test@gmail.com',
    password: 'testing123',
    name: 'testuser',
    placeOfBirth: 'Jakarta',
    dateOfBirth: '2000-01-01',
  };
  let user;

  beforeAll(async () => {
    await connect(databaseURI, databaseOptions);
    await userModel.db.deleteMany();
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await disconnect();
  });

  it('Creates a password hash', async () => {
    const password = 'testing123';
    const hash = await userModel.hashPassword(password);
    const isVerified = await userModel.comparePassword(password, hash);
    expect(isVerified).toBeTruthy();
  });

  it('Only allows password between 8-20 characters', () => {
    const password = 'test';
    expect(() => userModel.hashPassword(password)).rejects.toThrow();
  });

  it('Creates new user', async () => {
    user = await userModel.create(userData);
    expect(user).not.toBeNull();
  });

  it('Fetches the user', async () => {
    user = await userModel.readById(user._id);
    expect(user).not.toBeNull();
  });

  it('Updates the user', async () => {
    const updatedData = { placeOfBirth: 'Bali' };
    const { placeOfBirth } = await userModel.update(user._id, updatedData);
    expect(placeOfBirth).toBe(updatedData.placeOfBirth);
  });

  it('Deletes the users', async () => {
    const { _id } = await userModel.delete(user._id);
    expect(user._id).toStrictEqual(_id);
  });
});
