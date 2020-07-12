import UserModel from '#models/user';
import RefreshTokenModel from '#models/refresh-token';

/**
 * User service class to generate response
 */
export default class UserService {
  static userModel = new UserModel();
  static refreshTokenModel = new RefreshTokenModel();

  static async updateUser(userId, data) {
    try {
      const updatedUser = await this.userModel.update(userId, data); // Calls update from user model
      return { message: 'User updated successfully', updatedUser }; // Returns updated user data with message
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUser(userId, refreshTokenId) {
    try {
      const deletedUser = await this.userModel.delete(userId); // Calls delete from user model
      const expiredToken = await this.tokenModel.update(refreshTokenId, {
        isValid: false,
      }); // Calls update from token model to invalidate token
      return {
        message: 'User deleted successfully',
        expiredToken,
        deletedUser,
      }; // Returns deleted user and expired token information with message
    } catch (err) {
      console.error(err);
    }
  }
}
