import express from "express";
import { analyzeText, getUserHistory, deleteUserHistory } from "../controllers/analysisController.js";

const router = express.Router();

/**
 * @route   POST /api/analyze
 * @desc    Analyze chat text and save results
 */
router.post("/analyze", analyzeText);

/**
 * @route   GET /api/history/:email
 * @desc    Fetch analysis history for a specific user
 */
router.get("/history/:email", getUserHistory);

router.delete("/history/:email", deleteUserHistory);

export default router;