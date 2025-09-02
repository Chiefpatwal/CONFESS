// server.js - FIXED VERSION WITH NO DUPLICATE IMPORTS
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import confessionRoutes from "./routes/confessionRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();

// CORS configuration - more permissive for single deployment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          'https://confess-706b.onrender.com', // Your actual Render URL
          process.env.FRONTEND_URL,
        ].filter(Boolean)
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
      // For same-origin requests when serving frontend, allow null origin
      callback(null, true);
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

// Serve static files from React build (CORRECTED PATH!)
// In Render, the project structure is different, so we need to find the build folder
const buildPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'frontend/build')  // Production: from project root
  : path.join(__dirname, '../frontend/build'); // Development: relative to backend

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Looking for React build at:', buildPath);

// Check if build directory exists
if (!fs.existsSync(buildPath)) {
  console.error('❌ Build directory not found:', buildPath);
  console.log('Available directories:');
  try {
    const dirs = fs.readdirSync(process.cwd());
    console.log('Root directory contents:', dirs);
    
    if (fs.existsSync(path.join(process.cwd(), 'frontend'))) {
      const frontendContents = fs.readdirSync(path.join(process.cwd(), 'frontend'));
      console.log('Frontend directory contents:', frontendContents);
    }
  } catch (e) {
    console.error('Error reading directories:', e.message);
  }
} else {
  console.log('✅ Build directory found');
}

app.use(express.static(buildPath));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Debug route to help troubleshoot
app.get('/debug', (req, res) => {
  res.json({
    cwd: process.cwd(),
    dirname: __dirname,
    nodeEnv: process.env.NODE_ENV,
    buildPath: buildPath,
    buildExists: fs.existsSync(buildPath),
    rootContents: fs.existsSync(process.cwd()) ? fs.readdirSync(process.cwd()) : 'not found',
    frontendExists: fs.existsSync(path.join(process.cwd(), 'frontend')),
    frontendBuildExists: fs.existsSync(path.join(process.cwd(), 'frontend/build'))
  });
});

// Catch-all handler: send back React's index.html file for any non-API routes
// This MUST come after API routes but before error handlers
app.get('*', (req, res) => {
  // Don't serve React app for API routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/health') || req.path.startsWith('/debug')) {
    return res.status(404).json({
      error: 'Route not found',
      path: req.originalUrl,
      method: req.method
    });
  }
  
  // Serve React app for all other routes
  const indexPath = path.join(buildPath, 'index.html');
  console.log('Serving React app from:', indexPath);
  
  // Check if index.html exists before trying to serve it
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found at:', indexPath);
    return res.status(500).json({
      error: 'Frontend build not found',
      expectedPath: indexPath,
      buildPath: buildPath,
      cwd: process.cwd(),
      message: 'Please ensure the frontend build was created successfully'
    });
  }
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving React app:', err);
      res.status(500).json({
        error: 'Failed to serve frontend',
        message: err.message,
        path: indexPath
      });
    }
  });
});

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

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log(`Frontend build path: ${buildPath}`);
});