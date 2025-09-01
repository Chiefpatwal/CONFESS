import express from 'express';
import { 
  createConfession, 
  getConfessions, 
  updateConfession, 
  deleteConfession 
} from '../controllers/confessionController.js';

const router = express.Router();

// Public route - anyone can read confessions
router.get('/', getConfessions);

// Protected routes - authentication is handled by ClerkExpressWithAuth middleware
// The middleware populates req.auth for all routes, but we check req.auth.userId in controllers
router.post('/', createConfession);
router.put('/:id', updateConfession);
router.delete('/:id', deleteConfession);

export default router;