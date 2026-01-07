import express from "express";
//import cors from "cors";
//import mongoose from "mongoose";
import dotenv from "dotenv";

import { analyzeText } from "../controllers/analysisController.js";
dotenv.config();



const router = express.Router();

// POST http://localhost:5000/api/analyze
router.post("/analyze", analyzeText);


export default router;
