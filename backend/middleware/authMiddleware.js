import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

import { asyncHandler } from '../utils/asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read jwt from cookie
  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET');
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const isVerified = (req, res, next) => {
  if (req.user.isVerified) {
    next();
  } else {
    res
      .status(400)
      .json({ message: 'Please verify your email to access this route!' });
  }
};

export { isVerified, protect };
