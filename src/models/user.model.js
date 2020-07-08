import Model from './model';
import validator from 'validator';
import { hash, verify } from 'argon2';

/**
 * User model class.
 * @extends Model
 */
export default class UserModel extends Model {
  /**
   * Constructs user model with the name and defined schema.
   * @constructor
   */
  constructor() {
    super('Users', {
      email: {
        type: String,
        unique: true,
        validate: validator.isEmail,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      placeOfBirth: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
      },
    });
  }

  /**
   * Method that hashes plain text password, and checks if the password length is 8-20 characters.
   * @async
   * @param {string} password plain text password that will be hashed
   */
  async hashPassword(password) {
    if (password.length >= 8 && password.length <= 20) {
      return await hash(password);
    }
    throw new Error('Password length is not between 8-20 characters!');
  }

  /**
   * Method that returns boolean of hash and plain text comparison.
   * @async
   * @param {string} password plain text password that will be hashed
   * @param {string} hash hash that will be compared
   */
  async comparePassword(password, hash) {
    return await verify(hash, password);
  }

  /**
   * Method that creates new user data and stores to database collection.
   * @async
   * @param {object} data
   */
  async create(data) {
    data.password = this.hashPassword(data.password);
    data.isAdmin = false;
    return super.create(data);
  }

  /**
   * Method that creates new user data and stores to database collection.
   * @async
   * @param {string} id
   * @param {object} data
   */
  async update(id, data) {
    data.password = this.hashPassword(data.password);
    return super.update(id, data);
  }
}
