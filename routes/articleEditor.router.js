// backend/routes/articleEditor.router.js
import { Router } from "express";
import checkOwnership from "../middlewares/ownership.middleware.js";
import { updateArticle } from "../controllers/edit.controller.js"; // Your updateArticle logic

const router = Router();

// Apply checkOwnership only to routes that need it
router.put('/articles/:id', checkOwnership, updateArticle); // Route for updating an article
// sfofuvb

export default router;
