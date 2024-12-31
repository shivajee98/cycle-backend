// backend/routes/article.router.js
import { Router } from "express";
import validateRefreshToken from "../middlewares/userValidation.middleware.js";
import { updateUserProfile } from "../controllers/edit.controller.js";

const router = Router();


router.put('/profile/update', updateUserProfile); // Check ownership for profile updates

export default router;
