import sendEmail from '../config/mailer.js';
import User from '../model/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateUid } from '../utils/generateUid.js';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  const newUser = await User.create({
    name,
    email,
    password,
    uid: await generateUid(),
  });

  generateToken(res, newUser._id);

  const emailDescption = `<a href="http://localhost:5000/api/users/verify?uid=${newUser.uid}">Click here to verify your email</a> </a>`;

  sendEmail(req, res, newUser.email, 'Email Verification', emailDescption);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isVerified: newUser.isVerified,
    uid: newUser.uid,
  });
  return;
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      uid: user.uid,
    });
    return;
  }

  throw new Error('Invalid credentials');
});

const verifyUser = asyncHandler(async (req, res) => {
  const { uid } = req.query;

  const user = await User.findOne({ uid });

  if (!user) {
    throw new Error('Invalid User');
  }

  user.isVerified = true;
  await user.save();
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    uid: user.uid,
  });
});

export { registerUser, loginUser, verifyUser };
