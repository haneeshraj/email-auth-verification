import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
