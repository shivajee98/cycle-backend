// backend/routes/like.routes.js

import express from "express";
import { toggleLike } from "../controllers/like.controller.js";

const router = express.Router();

router.post("/:id/like", toggleLike); // POST request to like an article

export default router;
