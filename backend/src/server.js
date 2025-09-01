import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import confessionRoutes from "./routes/confessionRoutes.js";

dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();

// CORS configuration - be more specific in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true 
    : ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Clerk middleware
// Apply Clerk auth middleware only to protected routes
// Don't apply to all routes since some are public
const clerkAuth = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// API Routes
app.get('/api/health', async (req, res) => {
  res.json({ message: 'Server is running', status: 'healthy' });
});

app.use('/api/confessions', clerkAuth, confessionRoutes);

// Serve static files from the React app build directory
// Adjust the path based on your frontend build location
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend build
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Catch all handler: send back React's index.html file for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  // Development route
  app.get('/', (req, res) => {
    res.json({ message: 'Server is running in development mode' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});