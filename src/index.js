import http from 'http';
import app from './app';
import dbConnection from './database';
import config from './config';

dbConnection
  .then(() => {
    const { port } = config;

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Listening to port ${port}!`));
  })
  .catch((reason) => {
    console.error(reason);
  });
