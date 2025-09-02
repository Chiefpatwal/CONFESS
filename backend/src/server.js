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

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true 
    : ["http://localhost:5000", "http://localhost:5173", "http://localhost:3001"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Clerk middleware
const clerkAuth = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

console.log('Clerk middleware initialized');

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'healthy' });
});

console.log('Adding confession routes...');
app.use('/api/confessions', clerkAuth, confessionRoutes);
console.log('Confession routes added successfully');

// Development route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running in development mode' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server with confession routes running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});