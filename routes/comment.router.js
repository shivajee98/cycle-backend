// backend/routes/comment.router.js
import express from "express";
import { addComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:id/comments", addComment); // Add a comment




// router.get("/:articleId", getComments); // Get comments for an article
// router.delete("/:commentId", authenticateUser, deleteComment); // Delete a comment

export default router;
