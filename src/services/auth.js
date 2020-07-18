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
    const user = await this.userModel.readByEmail(email); // Fetch the user data based on existing email
    const passwordValid = await this.userModel.comparePassword(
      password,
      user.password
    ); // Compares password in argument and hash from database
    if (passwordValid) {
      const newSession = await sessionModel.create({ user }); // Creates new session in the database
      const accessPayload = { userId: user._id }; // Payload for the access token
      const accessToken = tokenHelper.generateAccessToken(accessPayload); // Generate new access token with the defined payload
      const refreshPayload = { sessionId: newSession._id }; // Payload for the refresh token
      const refreshToken = tokenHelper.generateRefreshToken(refreshPayload); // Generate new refresh token with the defined payload
      return { user, accessToken, refreshToken }; // Returns user informmation and auth tokens
    } // Checks if the password is correct and returns user info and tokens
    throw new Error('Username or password is incorrect!'); // Throws an error if username or password is not correct
  }

  /**
   * Method used to generate user information and auth tokens response when logging in
   * @param {object} authCredentials
   * @param {string} authCredentials.refreshToken
   */
  static async logout({ refreshToken }) {
    const { sessionId } = await tokenHelper.verifyRefreshToken(refreshToken); // Destructures token payload of session ID
    const data = { inValid: false }; // This object is used to invalidate existing session
    const expiredSession = await sessionModel.update(sessionId, data); // Invalidates token so that it cannot be used again
    return { expiredSession }; // Returns message and invalidated token
  }

  /**
   * Method used to create user account and auth tokens response when user is signing up
   * @param {object} data
   */
  static async signup(data) {
    const newUser = await userModel.create(data); // Creates and stores the new user data into collection
    const newSession = await sessionModel.create(newUser); // Creates and stores the new user session
    const accessPayload = { userId: newUser._id }; // Payload that will be stored within the access token
    const accessToken = tokenHelper.generateAccessToken(accessPayload); // Generate access token with the defined payload
    const refreshPayload = { sessionId: newSession._id }; // Payload that will be stored within the refresh token
    const refreshToken = tokenHelper.generateRefreshToken(refreshPayload); // Generate refresh token with the defined payload
    return { newUser, accessToken, refreshToken }; // Returns new user information and auth tokens
  }

  /**
   * Method used to refresh access token for authenticated api access
   * @param {object} data
   * @param {string} data.refreshToken
   */
  static async refresh({ refreshToken }) {
    const { sessionId } = tokenHelper.verifyRefreshToken(refreshToken); // Destructures refresh token payload of session ID
    const { isValid } = await sessionModel.readById(sessionId); // Destructures data fetched from database of valid session
    if (isValid) {
      const accessPayload = { userId: user }; // Generate new payload for the access token
      const accessToken = tokenHelper.generateAccessToken(accessPayload); // Generate new access token with the defined payload
      return { accessToken }; // Returns the new access token
    } // Checks if the session is valid
    throw new Error('Token is invalid!'); // Throws an error if the token is invalid
  }
}
