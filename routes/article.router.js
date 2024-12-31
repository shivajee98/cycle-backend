// backend/routes/article.router.js
import { Router } from "express";
import { start } from "../controllers/user.controller.js";

const router = Router();

router.route("/submit").post(start);

export default router;
