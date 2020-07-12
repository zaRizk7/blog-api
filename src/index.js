import app from '#core/app';
import dbConnection from '#core/database';
import { port, environment } from '#core/config';
import http from 'http';

dbConnection
  .then(() => {
    http.createServer(app).listen(port, () => {
      console.log(`Running on ${environment} environment.`);
      console.log(`Listening to port ${port}.`);
    });
  })
  .catch((reason) => {
    console.error(reason);
  });
