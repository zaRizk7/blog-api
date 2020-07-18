import 'dotenv/config';

const {
  NODE_ENV,
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION,
  DB_URI,
  DB_NAME,
} = process.env; // Imports all required variables from .env

/** Current environment for the application. either test, production, or development (default) */
export const environment = NODE_ENV || 'development';
/** Port that the server listens to. */
export const port = PORT || 3000;
/** Secret key for validating access token JWT. */
export const accessTokenSecret = ACCESS_TOKEN_SECRET || 'accessSecret';
/** Secret key for validating refresh token JWT. */
export const refreshTokenSecret = REFRESH_TOKEN_SECRET || 'refreshSecret';
/** Duration of valid access token.  */
export const tokenExpiration = TOKEN_EXPIRATION || '5s';
/** MongoDB database URI for database connection. */
export const databaseURI = DB_URI || 'mongodb://localhost:27017';
/** Mongoose configuration. */
export const databaseConfig = {
  dbName: DB_NAME || 'blog',
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default {
  environment,
  port,
  accessTokenSecret,
  refreshTokenSecret,
  tokenExpiration,
  databaseURI,
  databaseConfig,
};
