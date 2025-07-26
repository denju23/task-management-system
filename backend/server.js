import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';
import logger from './src/utils/logger.js';
import './src/cron/index.js';


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`❌ Server failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();
