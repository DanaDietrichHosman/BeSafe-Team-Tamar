import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// נתיב זה יהיה זמין בכתובת: POST /api/users/register
router.post("/register", register);

// נתיב זה יהיה זמין בכתובת: POST /api/users/login
router.post("/login", login);

export default router;