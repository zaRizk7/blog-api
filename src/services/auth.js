import UserModel from '#models/user';
import TokenModel from '#models/token';
import tokenHelper from '#helper/token';

export default class AuthService {
  static userModel = new UserModel();
  static tokenModel = new TokenModel();

  static async login({ email, password }) {
    try {
      const user = await this.userModel.readByEmail(email);
      const passwordValid = await this.userModel.comparePassword(
        password,
        user.password
      );
      if (passwordValid) {
        const token = tokenHelper.generateInitialToken({ _id: user._id });
        const refreshToken = await this.tokenModel.create({ token });
        return { message: 'Login successful!', user, refreshToken };
      }
      throw new Error('Username or password is incorrect!');
    } catch (error) {
      console.log(err);
    }
  }

  static async logout({ refreshTokenId }) {
    try {
      const expiredToken = await this.tokenModel.update(refreshTokenId, {
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
      const refreshToken = await this.tokenModel.create({
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
      const { token, isValid } = await this.tokenModel.readById(refreshTokenId);
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
