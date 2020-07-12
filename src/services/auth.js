import UserModel from '#models/user';
import RefreshTokenModel from '#models/refresh-token';
import tokenHelper from '#helper/token';

export default class AuthService {
  static userModel = new UserModel();
  static refreshTokenModel = new RefreshTokenModel();

  static async login({ email, password }) {
    try {
      const user = await this.userModel.readByEmail(email);
      const passwordValid = await this.userModel.comparePassword(
        password,
        user.password
      );
      if (passwordValid) {
        const token = tokenHelper.generateInitialToken({ _id: user._id });
        const refreshToken = await this.refreshTokenModel.create({
          token: token.refreshToken,
        });
        return { message: 'Login successful!', user, token };
      }
      throw new Error('Username or password is incorrect!');
    } catch (error) {
      console.log(err);
    }
  }

  static async logout({ refreshTokenId }) {
    try {
      const expiredToken = await this.refreshTokenModel.update(refreshTokenId, {
        isValid: false,
      });
      return { message: 'Logout successful!', expiredToken };
    } catch (err) {
      console.log(err);
    }
  }

  static async signup(data) {
    try {
      data.isAdmin = false;
      const newUser = await this.userModel.create(data);
      const accessToken = tokenHelper.generateAccessToken({ _id: newUser._id });
      const refreshToken = await this.refreshTokenModel.create({
        token: tokenHelper.generateRefreshToken({ _id: newUser._id }),
      });
      const token = { accessToken, refreshToken };
      return {
        message: 'Signup successful!',
        newUser,
        token,
      };
    } catch (error) {
      console.log(err);
    }
  }

  static async refresh({ refreshTokenId }) {
    try {
      const { token, isValid } = await this.refreshTokenModel.readById(
        refreshTokenId
      );
      if (isValid) {
        const { _id } = tokenHelper.verifyRefreshToken(token);
        return {
          message: 'Refreshing token successful!',
          accessToken: tokenHelper.generateAccessToken({ _id }),
        };
      }
      throw new Error('Token is invalid!');
    } catch (err) {
      console.log(err);
    }
  }
}
