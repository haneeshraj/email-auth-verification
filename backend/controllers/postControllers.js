import Post from '../model/postModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const post = await Post.create({
    title,
    description,
  });

  res.status(201).json({
    _id: post._id,
    title: post.title,
    description: post.description,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

export { createPost, getAllPosts };
