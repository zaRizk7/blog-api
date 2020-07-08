import http from 'http';
import app from './app';
import dbConnection from './database';
import { port, environment } from './config';

dbConnection
  .then(() => {
    http.createServer(app).listen(port, () => {
      console.log(`Running on ${environment} environment!`);
      console.log(`Listening to port ${port}!`);
    });
  })
  .catch((reason) => {
    console.error(reason);
  });
