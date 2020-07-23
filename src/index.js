import http from 'http';
import { connect, connection } from 'mongoose';
import app from '#core/app';
import { port, environment } from '#config/server';
import { databaseURI, databaseOptions } from '#config/database';

(async function initializeServer() {
  try {
    // Outputs success message if database connection executed successfully
    connection.on('open', () => console.log('Connected to the database.'));
    // Connects to a MongoDB database based on loaded URI and config
    await connect(databaseURI, databaseOptions);
    // Listens to the defined port within HTTP protocol configuration
    http.createServer(app).listen(port, () => {
      console.log(`Running on ${environment} environment.`);
      console.log(`Listening to port ${port}.`);
    });
  } catch (error) {
    // Console logs any occuring error
    console.error(error);
  }
})();
