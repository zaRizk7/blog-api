import UserModel from '#models/user';
import TokenModel from '#models/token';

export default class UserService {
  static userModel = new UserModel();
  static tokenModel = new TokenModel();

  static async updateUser(userId, data) {
    try {
      const updatedUser = await this.userModel.update(userId, data);
      return { message: 'User updated successfully', updatedUser };
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUser(userId, refreshTokenId) {
    try {
      const deletedUser = await this.userModel.delete(userId);
      const expiredToken = await this.tokenModel.update(refreshTokenId, {
        isValid: false,
      });
      return {
        message: 'User deleted successfully',
        expiredToken,
        deletedUser,
      };
    } catch (err) {
      console.error(err);
    }
  }
}
