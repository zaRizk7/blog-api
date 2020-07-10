import 'dotenv/config';

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const tokenExpiration = process.env.TOKEN_EXPIRATION;
export const databaseURI = process.env.DB_URI;
export const databaseConfig = {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
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
