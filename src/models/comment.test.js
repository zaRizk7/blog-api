import { connect, connection, disconnect } from 'mongoose';
import { databaseURI, databaseConfig } from '#core/config';
import CommentModel from '#models/comment';
import UserModel from '#models/user';
import PostModel from '#models/post';

describe('Testing post model CRUD', () => {
  const userModel = new UserModel(),
    postModel = new PostModel(),
    commentModel = new CommentModel(),
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
    },
    commentData = {
      caption: 'Test caption',
    };
  let user, post, comment;

  beforeAll(async () => {
    await connect(databaseURI, databaseConfig);
    await userModel.db.deleteMany();
    await postModel.db.deleteMany();
    await commentModel.db.deleteMany();
    user = await userModel.create(userData);
    postData.author = user._id;
    post = await postModel.create(postData);
    commentData.post = post._id;
    commentData.commenter = user._id;
  });

  afterAll(async () => {
    await userModel.db.deleteMany();
    await postModel.db.deleteMany();
    await commentModel.db.deleteMany();
    await disconnect();
  });

  it('Creates new comment', async () => {
    comment = await commentModel.create(commentData);
    expect(comment).not.toBeNull();
  });

  it('Fetches the comment', async () => {
    comment = await commentModel.readById(comment._id);
    expect(comment).not.toBeNull();
  });

  it('Updates the comment', async () => {
    const updatedCommentData = { caption: 'New comment caption' };
    const { caption } = await commentModel.update(
      comment._id,
      updatedCommentData
    );
    expect(caption).toBe(updatedCommentData.caption);
  });

  it('Deletes the comment', async () => {
    const { _id } = await commentModel.delete(comment._id);
    expect(comment._id).toStrictEqual(_id);
  });
});
