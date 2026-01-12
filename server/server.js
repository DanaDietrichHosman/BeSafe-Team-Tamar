import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/content.js";
import analyzeRoutes from "./routes/analysisRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/**
 * Server Status Dashboard - Aggregating data from all users
 */
app.get("/", async (req, res) => {
  try {
    // עדכון השאילתה למבנה המודל החדש
    const aggregatedData = await Content.aggregate([
      { $unwind: "$analysisData" }, // מפרק את מערך המילים למסמכים נפרדים
      {
        $group: {
          _id: "$analysisData.word", // קיבוץ לפי המילה בתוך המערך
          totalCount: { $sum: "$analysisData.count" } // סכימת המופעים
        }
      },
      { $sort: { totalCount: -1 } }
    ]);

    const latestData = aggregatedData.map(item => ({
      word: item._id,
      count: item.totalCount
    }));

    const rows = latestData.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.word}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #d63384;">${item.count}</td>
      </tr>
    `).join("");

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #d63384; padding-bottom: 10px;">🛡️ GuardianAI Server Status</h2>
        <p><strong>Database:</strong> <span style="color: green;">Connected ✅</span></p>
        <h3 style="margin-top: 20px;">Global Aggregated Offensive Words:</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px;">Word</th>
              <th style="padding: 10px;">Total Occurrences</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="2" style="padding:20px; text-align:center;">No data analyzed yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    res.send(html);
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send(`
      <div style="font-family: sans-serif; color: red; padding: 20px;">
        <h3>❌ Error fetching aggregated data</h3>
        <p>${error.message}</p>
      </div>
    `);
  }
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/text-analysis")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api", analyzeRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});