import UserModel from '#models/user';
import SessionModel from '#models/session';
import tokenHelper from '#helper/token';

const userModel = new UserModel();
const sessionModel = new SessionModel();

/**
 * Auth service class used to handling authentication.
 */
export default class AuthService {
  /**
   * Method used to generate user information and auth tokens response when logging in
   * @param {object} loginCredentials
   * @param {string} loginCredentials.email
   * @param {string} loginCredentials.password
   */
  static async login({ email, password }) {
    // Fetch the user data based on existing email
    const user = await this.userModel.readByEmail(email);
    // Compares password in argument and hash from database
    const passwordValid = await this.userModel.comparePassword(
      password,
      user.password
    );
    // Checks if the password is correct and returns user info and tokens
    if (passwordValid) {
      // Creates new session in the database
      const newSession = await sessionModel.create({ user });
      // Payload for the access token
      const accessPayload = { userId: user._id };
      // Generate new access token with the defined payload
      const accessToken = tokenHelper.generateAccessToken(accessPayload);
      // Payload for the refresh token
      const refreshPayload = { sessionId: newSession._id };
      // Generate new refresh token with the defined payload
      const refreshToken = tokenHelper.generateRefreshToken(refreshPayload);
      // Returns user informmation and auth tokens
      return { user, accessToken, refreshToken };
    }
    // Throws an error if username or password is not correct
    throw new Error('Username or password is incorrect!');
  }

  /**
   * Method used to generate user information and auth tokens response when logging in
   * @param {object} authCredentials
   * @param {string} authCredentials.refreshToken
   */
  static async logout({ refreshToken }) {
    // Destructures token payload of session ID
    const { sessionId } = await tokenHelper.verifyRefreshToken(refreshToken);
    // This object is used to invalidate existing session
    const data = { inValid: false };
    // Invalidates token so that it cannot be used again
    const expiredSession = await sessionModel.update(sessionId, data);
    // Returns message and invalidated token
    return { expiredSession };
  }

  /**
   * Method used to create user account and auth tokens response when user is signing up
   * @param {object} data
   */
  static async signup(data) {
    // Creates and stores the new user data into collection
    const newUser = await userModel.create(data);
    // Creates and stores the new user session
    const newSession = await sessionModel.create(newUser);
    // Payload that will be stored within the access token
    const accessPayload = { userId: newUser._id };
    // Generate access token with the defined payload
    const accessToken = tokenHelper.generateAccessToken(accessPayload);
    // Payload that will be stored within the refresh token
    const refreshPayload = { sessionId: newSession._id };
    // Generate refresh token with the defined payload
    const refreshToken = tokenHelper.generateRefreshToken(refreshPayload);
    // Returns new user information and auth tokens
    return { newUser, accessToken, refreshToken };
  }

  /**
   * Method used to refresh access token for authenticated api access from request body
   * @param {object} body
   * @param {string} body.refreshToken
   */
  static async refresh({ refreshToken }) {
    // Destructures refresh token payload of session ID
    const { sessionId } = tokenHelper.verifyRefreshToken(refreshToken);
    // Destructures data fetched from database of valid session
    const { isValid } = await sessionModel.readById(sessionId);
    // Checks if the session is valid
    if (isValid) {
      // Generate new payload for the access token
      const accessPayload = { userId: user };
      // Generate new access token with the defined payload
      const accessToken = tokenHelper.generateAccessToken(accessPayload);
      // Returns the new access token
      return { accessToken };
    }
    // Throws an error if the token is invalid
    throw new Error('Token is invalid!');
  }
}
