import {
  accessTokenSecret,
  refreshTokenSecret,
  tokenExpiration,
} from '#core/config';
import { sign, verify } from 'jsonwebtoken';

/**
 * Used to generate access token with defined secret and expiration time.
 * @param {string | object} payload
 */
export function generateAccessToken(payload) {
  return sign(payload, accessTokenSecret, { expiresIn: tokenExpiration });
}

/**
 * Used to get access token from authorization header of a request.
 * @param {object} requestHeader
 * @param {string} requestHeader.authorization
 */
export function getAccessToken({ authorization }) {
  return authorization.split(' ')[1];
}

/**
 * Used to verify access token.
 * @param {string} token
 */
export function verifyAccessToken(token) {
  return verify(token, accessTokenSecret);
}

/**
 * Used to generate refresh token with defined secret.
 * @param {string | object} payload
 */
export function generateRefreshToken(payload) {
  return sign(payload, refreshTokenSecret);
}

/**
 * Used to verify access token.
 * @param {string} token
 */
export function verifyRefreshToken(token) {
  return verify(token, refreshTokenSecret);
}

/**
 * Used to generate token upon signup or login.
 * @param {string | object} payload
 */
export function generateInitialToken(payload) {
  return {
    refreshToken: generateRefreshToken(payload),
    accessToken: generateAccessToken(payload),
  };
}

export default {
  generateAccessToken,
  getAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateInitialToken,
};
