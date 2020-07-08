import Model from './model';
import UserSchema from './schema/user.schema';
import { hash, verify } from 'argon2';

export default class UserModel extends Model {
  constructor() {
    super('Users', UserSchema);
  }

  async hashPassword(password) {
    if (password.length >= 8 && password.length <= 20) {
      password = this.hashPassword(password);
      return await hash(password);
    }
    throw new Error('Password length is not between 8-20 characters!');
  }

  async comparePassword(password, hash) {
    return await verify(hash, password);
  }

  async create(data) {
    data.password = this.hashPassword(data.password);
    return super.create(data);
  }

  async update(id, data) {
    data.password = this.hashPassword(data.password);
    return super.update(id, data);
  }
}
