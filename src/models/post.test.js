import { connect, connection, disconnect } from 'mongoose';
import { databaseURI, databaseConfig } from '#core/config';
import UserModel from '#models/user';
import PostModel from '#models/post';

describe('Testing post model CRUD', () => {
  const userModel = new UserModel(),
    postModel = new PostModel(),
    userData = {
      email: 'testpost@gmail.com',
      password: 'testing123',
      name: 'testuser',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '2000-01-01',
    },
    postData = {
      title: 'Test post',
      description: 'Test description',
      caption: 'Test caption',
    };
  let user, post;

  beforeAll(async () => {
    await connect(databaseURI, databaseConfig);
    await userModel.db.deleteMany();
    await postModel.db.deleteMany();
    user = await userModel.create(userData);
    postData.author = user._id;
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await postModel.db.deleteMany();
    await disconnect();
  });

  it('Creates new post', async () => {
    post = await postModel.create(postData);
    expect(post).not.toBeNull();
  });

  it('Fetches the post', async () => {
    post = await postModel.readById(post._id);
    expect(post).not.toBeNull();
  });

  it('Updates the post', async () => {
    const updatedPostData = { title: 'New post title' };
    const { title } = await postModel.update(post._id, updatedPostData);
    expect(title).toBe(updatedPostData.title);
  });

  it('Deletes the post', async () => {
    const { _id } = await postModel.delete(post._id);
    expect(post._id).toStrictEqual(_id);
  });
});
