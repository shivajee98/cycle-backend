// /backend/routes/protected.router.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.fullName}` });
});

export default router;
