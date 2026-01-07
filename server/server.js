import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import analyzeRoutes from "./routes/analysisRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// חיבור ל-MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/text-analysis")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api", analyzeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
