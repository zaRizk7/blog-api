import { sign, verify } from 'jsonwebtoken';
import {
  accessTokenSecret,
  refreshTokenSecret,
  tokenExpiration,
} from '#core/config';

export function generateAccessToken(payload) {
  return sign(payload, accessTokenSecret, { expiresIn: tokenExpiration });
}

export function verifyAccessToken(token) {
  return verify(token, accessTokenSecret);
}

export function generateRefreshToken(payload) {
  return sign(payload, refreshTokenSecret);
}

export function verifyRefreshToken(token) {
  return verify(token, refreshTokenSecret);
}

export function generateInitialToken(payload) {
  return {
    refreshToken: generateRefreshToken(payload),
    accessToken: generateAccessToken(payload),
  };
}

export default {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateInitialToken,
};
