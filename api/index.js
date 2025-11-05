import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server running on Vercel');
});

// Example API route
app.get('/api/posts', (req, res) => {
  res.json([{ id: 1, title: 'Hello from Vercel!' }]);
});

// Export handler for Vercel
export const handler = serverless(app);
