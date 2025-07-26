import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import errorMiddleware from './middlewares/errorMiddleware.js';
import  notFound  from './middlewares/notFound.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import activityLogRoutes from './routes/activityLogRoutes.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const BASE_URL = '/api/v1'; // ✅ Define your base API path here


// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());             // sanitize req.body, req.query, req.params
app.use(xssClean());                  // sanitize user input against XSS
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.status(200).send('🚀 API is working');
});

// Routes
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/projects`, projectRoutes);
app.use(`${BASE_URL}/tasks`, taskRoutes);
app.use(`${BASE_URL}/tasks/logs`, activityLogRoutes);



// Error Handlers
app.use(notFound);
app.use(errorMiddleware);

export default app;
