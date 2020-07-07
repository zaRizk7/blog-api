import { connect, connection } from 'mongoose';
import config from './config';

const { databaseURI, databaseName } = config;

connection.on('open', () => console.log('Connected to the database!'));
export default connect(databaseURI, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName,
});
