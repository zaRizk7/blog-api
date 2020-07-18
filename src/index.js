import http from 'http';
import { connect, connection } from 'mongoose';
import app from '#core/app';
import { port, environment, databaseURI, databaseConfig } from '#core/config';

(async function initializeServer() {
  try {
    connection.on('open', () => console.log('Connected to the database.')); // Outputs success message if database connection executed successfully
    await connect(databaseURI, databaseConfig); // Connects to a MongoDB database based on loaded URI and config
    http.createServer(app).listen(port, () => {
      console.log(`Running on ${environment} environment.`);
      console.log(`Listening to port ${port}.`);
    }); // Listens to the defined port within HTTP protocol configuration
  } catch (error) {
    console.error(error); // Console logs any occuring error
  }
})();
