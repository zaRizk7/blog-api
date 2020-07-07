import 'dotenv/config';

export default {
  port: process.env.PORT,
  databaseURI: process.env.DB_URI,
  databaseName: process.env.DB_NAME
};
