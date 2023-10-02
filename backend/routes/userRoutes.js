import express from 'express';
import {
  loginUser,
  registerUser,
  verifyUser,
} from '../controllers/userControllers.js';

const router = express.Router();

// @route POST api/users
// @desc Register user
// @access Public
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').get(verifyUser);

export default router;
