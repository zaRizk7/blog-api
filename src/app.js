import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import route from './routes/route';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

export default app;
