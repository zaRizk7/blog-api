import { connect, connection, disconnect } from 'mongoose';
import { databaseURI, databaseConfig } from '#core/config';
import UserModel from '#models/user';
import UploadModel from '#models/upload';

describe('Testing upload model CRUD', () => {
  const userModel = new UserModel(),
    uploadModel = new UploadModel(),
    userData = {
      email: 'test@gmail.com',
      password: 'testing123',
      name: 'testuser',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '2000-01-01',
    },
    uploadData = {
      fileName: 'test',
      fileType: 'jpeg',
      size: 1024,
      metadata: 'test',
      url: 'abc.com',
    };
  let user, upload;

  beforeAll(async () => {
    await connect(databaseURI, databaseConfig);
    await userModel.db.deleteMany();
    await uploadModel.db.deleteMany();
    user = await userModel.create(userData);
    uploadData.uploader = user;
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await uploadModel.db.deleteMany();
    await disconnect();
  });

  it('Creates new upload', async () => {
    upload = await uploadModel.create(uploadData);
    expect(upload).not.toBeNull();
  });

  it('Validate if the URL is really an URL', async () => {
    uploadData.url = 'abc';
    expect(() => uploadModel.create(uploadData)).rejects.toThrow();
  });

  it('Fetches the upload', async () => {
    upload = await uploadModel.readById(upload._id);
    expect(upload).not.toBeNull();
  });

  it('Updates the upload', async () => {
    const updatedData = { size: 2048 };
    const { size } = await uploadModel.update(upload._id, updatedData);
    expect(size).toBe(2048);
  });

  it('Deletes the upload', async () => {
    const { _id } = await uploadModel.delete(upload._id);
    expect(upload._id).toStrictEqual(_id);
  });
});
