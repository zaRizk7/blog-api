import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import route from '#core/route';
import { environment } from '#config/server';

// Initialize express application
const app = express();
// Logger when running in development environment
if (environment === 'development') app.use(morgan('dev'));
// Allow Cross Origin Resource Sharing for fetching and request data
app.use(cors());
// Enable xxx-form-urlencoded parsing
app.use(express.urlencoded({ extended: true }));
// Enable JSON parsing
app.use(express.json());
// Load all API routes
app.use('/api/v1', route);

export default app;
