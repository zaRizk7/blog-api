import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import route from '#core/route';
import { environment } from '#core/config';

const app = express();

if (environment === 'development') app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

export default app;
