import express from 'express';
import { getUserProfile } from '../controllers/profile.controller.js';

const router = express.Router();

// Get user profile
router.get('/:userId', getUserProfile);


export default router;