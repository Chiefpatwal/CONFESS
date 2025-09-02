import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import connectDB from './db.js';
import confessionRoutes from './routes/confessionRoutes.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
// Middleware
app.use(cors({
  origin: "*",
  credentials: true,      
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(ClerkExpressWithAuth()); 


// Routes
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/confessions', confessionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});