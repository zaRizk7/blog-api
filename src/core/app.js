import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import route from '#core/route';
import { environment } from '#core/config';

const app = express(); // Initialize express application

if (environment === 'development') app.use(morgan('dev')); // Logger when running in development environment
app.use(cors()); // Allow Cross Origin Resource Sharing to allow fetching and request data
app.use(express.urlencoded({ extended: true })); // Enable xxx-form-encoded parsing
app.use(express.json()); // Enable JSON parsing
app.use('/api/v1', route); // Load all API routes

export default app;
