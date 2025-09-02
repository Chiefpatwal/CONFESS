import express from 'express';
import { 
  createConfession, 
  getConfessions, 
  updateConfession, 
  deleteConfession 
} from '../controllers/confessionController.js';
import { validateConfessionInput } from '../middlewares/validate.js';

const router = express.Router();

// Public route
router.get('/', getConfessions);

// Protected routes with validation
router.post('/', validateConfessionInput, createConfession);
router.put('/:id', validateConfessionInput, updateConfession);
router.delete('/:id', deleteConfession);

export default router;