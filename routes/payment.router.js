// backend/routes/article.router.js
import { Router } from "express";
import { end } from "../controllers/user.controller.js";

const router = Router();

router.route("/submit").post(end);

export default router;
