import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import path from 'path';

dotenv.config();
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

// Use helmet to set various HTTP headers for security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
      },
    },
  }),
);

// Use morgan for logging HTTP requests
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.send('Server is running');
});

// Apply rate limiter to all API routes
app.use('/api', apiLimiter);

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'frontend', 'dist');
  console.log(frontendPath);

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )
    `; // Test the database connection
    console.log('Database connection successful');
  } catch (error) {
    console.log('Error initializing database:', error);
  }
}

const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error starting server:', error);
  });
