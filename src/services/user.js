import UserModel from '#models/user';
import SessionModel from '#models/session';

const userModel = new UserModel();
const sessionModel = new SessionModel();

/**
 * User service class to handling user data.
 */
export default class UserService {
  static async updateUser(userId, data) {
    const updatedUser = await userModel.update(userId, data); // Calls update from user model
    return { updatedUser }; // Returns message and updated user data
  }

  static async deleteUser(userId, refreshTokenId) {
    const deletedUser = await userModel.delete(userId); // Calls delete from user model
    const data = { inValid: false }; // This object is used to invalidate existing session
    const expiredToken = await sessionModel.update(refreshTokenId, data); // Calls update from token model to invalidate token
    return { deletedUser, expiredToken }; // Returns deleted user, and expired token information response
  }
}
