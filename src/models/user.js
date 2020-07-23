import { Schema } from 'mongoose';
import { hash, verify } from 'argon2';
import validator from 'validator';
import Model from '#core/model';

/**
 * User model class.
 * @extends Model
 */
class User extends Model {
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
        default: false,
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
    // Returns the password hash if the password is valid
    if (password.length >= 8 && password.length <= 20) return hash(password);
    // Returns error if the password is not valid
    throw new Error('Password length is not between 8-20 characters!');
  }

  /**
   * Method that returns boolean of hash and plain text comparison.
   * @param {string} password plain text password that will be hashed
   * @param {string} hash hash that will be compared
   */
  async comparePassword(password, hash) {
    // Returns true if the password is correct
    return verify(hash, password);
  }

  /**
   * Method that creates new user data and stores to database collection.
   * @async
   * @param {object} data
   */
  async create(data) {
    // Hash the password if valid
    data.password = await this.hashPassword(data.password);
    // Create and store the data into database
    return super.create(data);
  }

  readByEmail(email) {
    // Find user based on unique email address
    return this.db.findOne({ email });
  }

  /**
   * Method that creates new user data and stores to database collection.
   * @async
   * @param {string} id
   * @param {object} data
   */
  async update(id, data) {
    // Returns the password hash if the password is valid if password are going to be updated
    if (data.password) data.password = await this.hashPassword(data.password);
    // Updates the data changes into database
    return super.update(id, data);
  }
}

export default new User();
