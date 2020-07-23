import awsConfig from '#config/aws';
import databaseConfig from '#config/database';
import serverConfig from '#config/server';
import tokenConfig from '#config/token';

/** All configs from config folder combined */
const config = {
  awsConfig,
  databaseConfig,
  serverConfig,
  tokenConfig,
};

export {
  config as default,
  awsConfig,
  databaseConfig,
  serverConfig,
  tokenConfig,
};
