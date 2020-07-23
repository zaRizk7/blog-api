import 'dotenv/config';

const { DB_URI, DB_NAME } = process.env;

/** MongoDB database URI for database connection. */
const databaseURI = DB_URI || 'mongodb://localhost:27017';

/** Mongoose configuration options. */
const databaseOptions = {
  dbName: DB_NAME || 'blog',
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/** All database configs. */
const databaseConfig = {
  databaseURI,
  databaseOptions,
};

export { databaseConfig as default, databaseURI, databaseOptions };
