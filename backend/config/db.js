import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

//create a SQL client using the neon function and the connection stringfrom the environment variables
export const sql = neon(process.env.DATABASE_URL);
