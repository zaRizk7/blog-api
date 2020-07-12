import Model from '#core/model';
import { Schema } from 'mongoose';
import validator from 'validator';
import { hash, verify } from 'argon2';

/**
 * User model class.
 * @extends Model
 */
export default class User extends Model {
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
      posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
      uploads: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
    });
  }

  /**
   * Method that hashes plain text password, and checks if the password length is 8-20 characters.
   * @param {string} password plain text password that will be hashed
   */
  async hashPassword(password) {
    if (password.length >= 8 && password.length <= 20) return hash(password);
    throw new Error('Password length is not between 8-20 characters!');
  }

  /**
   * Method that returns boolean of hash and plain text comparison.
   * @param {string} password plain text password that will be hashed
   * @param {string} hash hash that will be compared
   */
  async comparePassword(password, hash) {
    return verify(hash, password);
  }

  /**
   * Method that creates new user data and stores to database collection.
   * @param {object} data
   */
  create(data) {
    data.password = this.hashPassword(data.password);
    return super.create(data);
  }

  readByEmail(email) {
    return this.db.findOne({ email });
  }

  /**
   * Method that creates new user data and stores to database collection.
   * @param {string} id
   * @param {object} data
   */
  update(id, data) {
    data.password = this.hashPassword(data.password);
    return super.update(id, data);
  }
}
