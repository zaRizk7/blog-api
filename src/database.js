import { connect, connection } from 'mongoose';
import { databaseURI, databaseConfig } from './config';

connection.on('open', () => console.log('Connected to the database!'));
export default connect(databaseURI, databaseConfig);
