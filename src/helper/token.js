import { sign, verify } from 'jsonwebtoken';
import tokenConfig from '#config/token';

/**
 * Used to generate access token with defined secret and expiration time.
 * @param {string | object} payload
 */
export function generateAccessToken(payload) {
  // Generate access token with defined secret key and expiration time
  return sign(payload, tokenConfig.accessTokenSecret, {
    expiresIn: tokenConfig.tokenExpiration,
  });
}

/**
 * Used to get access token from authorization header of a request.
 * @param {object} requestHeader
 * @param {string} requestHeader.authorization
 */
export function getAccessToken({ authorization }) {
  // Separate 'Bearer ${TOKEN}' string to return the only the token
  return authorization.split(' ')[1];
}

/**
 * Used to verify access token.
 * @param {string} token
 */
export function verifyAccessToken(token) {
  // Verifies access token with the same secret key
  return verify(token, tokenConfig.accessTokenSecret);
}

/**
 * Used to generate refresh token with defined secret.
 * @param {string | object} payload
 */
export function generateRefreshToken(payload) {
  // Generate refresh token with defined secret key
  return sign(payload, tokenConfig.refreshTokenSecret);
}

/**
 * Used to verify access token.
 * @param {string} token
 */
export function verifyRefreshToken(token) {
  // Verifies refresh token with the same secret key
  return verify(token, tokenConfig.refreshTokenSecret);
}

export default {
  generateAccessToken,
  getAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
