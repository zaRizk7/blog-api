import 'dotenv/config';

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
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
  databaseURI,
  databaseConfig,
};
