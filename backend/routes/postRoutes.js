import express from 'express';

import { protect, isVerified } from '../middleware/authMiddleware.js';
import { createPost, getAllPosts } from '../controllers/postControllers.js';

const router = express.Router();

router.route('/').post(protect, isVerified, createPost).get(getAllPosts);

export default router;
