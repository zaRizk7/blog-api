import 'dotenv/config';

const { NODE_ENV, PORT } = process.env;

/** Current environment for the application. either test, production, or development (default) */
const environment = NODE_ENV || 'development';

/** Port that the server listens to. */
const port = PORT || 3000;

/** All server configs. */
const serverConfig = {
  environment,
  port,
};

export { serverConfig as default, environment, port };
