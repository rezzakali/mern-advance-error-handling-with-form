import { Router } from 'express';
import auth from '../middleware/auth.js';

const router = Router();

// get todos
router.get('/', auth, (req, res) => {
  res.send('todos found here');
});

export default router;
