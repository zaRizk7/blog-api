import express from 'express';
import morgan from 'morgan';
import route from './routes/index.route';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(route);

export default app;
