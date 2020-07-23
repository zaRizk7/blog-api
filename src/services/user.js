import userModel from '#models/user';
import sessionModel from '#models/session';

/**
 * User service class to handling user data.
 */
class UserService {
  static async updateUser(userId, data) {
    // Calls update from user model
    const updatedUser = await userModel.update(userId, data);
    // Returns message and updated user data
    return { updatedUser };
  }

  static async deleteUser(userId, refreshTokenId) {
    // Calls delete from user model
    const deletedUser = await userModel.delete(userId);
    // This object is used to invalidate existing session
    const data = { isValid: false };
    // Calls update from token model to invalidate token
    const expiredToken = await sessionModel.update(refreshTokenId, data);
    // Returns deleted user, and expired token information response
    return { deletedUser, expiredToken };
  }
}

export default new UserService();
