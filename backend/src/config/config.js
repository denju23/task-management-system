import dotenv from 'dotenv';
dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'yourSecretKey',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};