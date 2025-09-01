
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const requireAuth = ClerkExpressRequireAuth();


export const customRequireAuth = (req, res, next) => {
  ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please sign in to access this resource'
      });
    }
    
  
    next();
  });
};