import 'dotenv/config';

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION,
} = process.env; // Imports all required variables from .env

/** Secret key for validating access token JWT. */
const accessTokenSecret = ACCESS_TOKEN_SECRET || 'accessSecret';

/** Secret key for validating refresh token JWT. */
const refreshTokenSecret = REFRESH_TOKEN_SECRET || 'refreshSecret';

/** Duration of valid access token.  */
const tokenExpiration = TOKEN_EXPIRATION || '5s';

/** All JWT token configurations. */
const tokenConfig = {
  accessTokenSecret,
  refreshTokenSecret,
  tokenExpiration,
};

export {
  tokenConfig as default,
  accessTokenSecret,
  refreshTokenSecret,
  tokenExpiration,
};
