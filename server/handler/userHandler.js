// external imports
import { Router } from 'express';

// internal imports
import loginController from '../controller/loginController.js';
import registerController from '../controller/registerController.js';

// call the Router object
const router = Router();

// register router
router.post('/register', registerController);

// login router
router.post('/login', loginController);

// forgot password router
// router.post('/forgot', forgotPasswordController);

export default router;
