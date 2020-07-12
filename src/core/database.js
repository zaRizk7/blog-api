import { connect, connection } from 'mongoose';
import { databaseURI, databaseConfig } from '#core/config';

connection.on('open', () => console.log('Connected to the database.')); // Outputs success message if database connection executed successfully
export default connect(databaseURI, databaseConfig); // Connects to a MongoDB database
