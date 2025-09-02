// server.js - FIXED VERSION
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import confessionRoutes from "./routes/confessionRoutes.js";

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();

// CORS configuration for separate deployments
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          process.env.FRONTEND_URL,
          // Add your actual frontend domain here
          'https://your-frontend-domain.com',
          'https://your-frontend-domain.netlify.app',
          'https://your-frontend-domain.vercel.app'
        ].filter(Boolean) // Remove undefined values
      : [
          "http://localhost:5000", 
          "http://localhost:5173", 
          "http://localhost:3001",
          "http://localhost:3000"
        ];

    console.log('CORS check - Origin:', origin, 'Allowed origins:', allowedOrigins);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Clerk middleware
const clerkAuth = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

console.log('Clerk middleware initialized');

// Health check route (should be accessible without auth)
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Server is running', 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'API is running', 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

console.log('Adding confession routes...');
app.use('/api/confessions', clerkAuth, confessionRoutes);
console.log('Confession routes added successfully');

// Development route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Confession API Server',
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/health',
      api_health: '/api/health',
      confessions: '/api/confessions'
    }
  });
});

// Handle preflight requests
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS error: Origin not allowed',
      origin: req.get('Origin')
    });
  }
  
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
});