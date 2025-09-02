import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Optional: Use this if you need stricter auth on specific routes
export const requireAuth = (req, res, next) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Please sign in to access this resource'
    });
  }
  next();
};