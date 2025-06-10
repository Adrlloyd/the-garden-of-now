import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000'),
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/the_garden_of_now', // Use this to switch to Spoonacular API later in dev phase
  path: path.resolve(__dirname, '../assets')
};