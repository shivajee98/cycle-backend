// backend/routes/article.router.js
import { Router } from "express";
import { getUser, getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.route("/all").get(getAllUsers);
router.route("/user").get(getUser);

export default router;
