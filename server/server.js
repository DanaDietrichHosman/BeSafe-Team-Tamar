import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/content.js";
import analyzeRoutes from "./routes/analysisRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/**
 * Server Status Dashboard - מציג אך ורק את הניתוח האחרון ביותר מה-DB
 */
app.get("/", async (req, res) => {
  try {
    // שליפת הניתוח האחרון ביותר שבוצע (sort לפי תאריך יצירה יורד)
    const latestAnalysis = await Content.findOne().sort({ createdAt: -1 });

    let contentHtml = '';

    if (latestAnalysis) {
      // יצירת תגיות למילים שנמצאו בניתוח האחרון
      const wordList = latestAnalysis.analysisData && latestAnalysis.analysisData.length > 0 
        ? latestAnalysis.analysisData.map(item => `
            <span style="background: #fff0f5; padding: 5px 12px; border-radius: 15px; margin: 5px; border: 1px solid #ffdce8; display: inline-block; font-size: 0.9rem;">
              <strong>${item.word}</strong> (${item.count})
            </span>
          `).join("")
        : '<span style="color: #999;">No offensive words detected</span>';

      contentHtml = `
        <div style="background: #f9f9f9; padding: 25px; border-radius: 15px; border-left: 5px solid #d63384; margin-top: 20px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #d63384;">Latest Analysis Result</h3>
            <span style="background: ${latestAnalysis.riskLevel >= 7 ? '#ff4d4f' : latestAnalysis.riskLevel >= 4 ? '#fd7e14' : '#28a745'}; color: white; padding: 6px 15px; border-radius: 50px; font-weight: bold; font-size: 1.1rem;">
              Risk Score: ${latestAnalysis.riskLevel}/10
            </span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>👤 User Email:</strong> ${latestAnalysis.userEmail}</p>
            <p style="margin: 5px 0;"><strong>🔍 Social Context:</strong> ${latestAnalysis.contextAnalysis || 'N/A'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <strong>🚫 Detected Offensive Words:</strong><br/>
            <div style="margin-top: 10px;">${wordList}</div>
          </div>
          
          <div style="background: #fff5f8; padding: 15px; border-radius: 10px; border: 1px dashed #d63384;">
            <strong>💡 Recommendation:</strong><br/>
            <p style="margin-top: 8px; color: #444; line-height: 1.4;">${latestAnalysis.recommendation || 'No recommendation provided'}</p>
          </div>
          
          <div style="margin-top: 15px; font-size: 0.8rem; color: #999; text-align: right;">
            Analyzed at: ${new Date(latestAnalysis.createdAt).toLocaleString('he-IL')}
          </div>
        </div>
      `;
    } else {
      contentHtml = `
        <div style="text-align:center; padding: 60px; color: #888; background: #f9f9f9; border-radius: 15px; margin-top: 20px;">
          <div style="font-size: 3rem; margin-bottom: 10px;">📥</div>
          <h3>No data found yet</h3>
          <p>Go to the app and analyze a chat to see the result here.</p>
        </div>`;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SafeChat Live Monitor</title>
      </head>
      <body style="background-color: #f0f2f5; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, sans-serif;">
          <div style="max-width: 750px; margin: 40px auto; padding: 30px; border: 1px solid #ffdce8; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); background: white; text-align: center;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d63384; padding-bottom: 15px; margin-bottom: 10px;">
              <h2 style="margin: 0; color: #2c3e50;">🛡️ SafeChat Live Monitor</h2>
              <span style="background: #e8f5e9; color: #2e7d32; padding: 5px 12px; border-radius: 50px; font-size: 0.9rem; font-weight: bold;">MongoDB Connected ✅</span>
            </div>
            
            <p style="color: #666;">Showing the <strong>most recent</strong> analysis result from the database.</p>

            ${contentHtml}

            <div style="margin-top: 30px; text-align: center;">
              <button onclick="window.location.reload()" style="background: #d63384; color: white; border: none; padding: 12px 28px; border-radius: 50px; cursor: pointer; font-weight: bold; font-size: 1rem; transition: 0.3s; box-shadow: 0 4px 10px rgba(214, 51, 132, 0.3);">
                🔄 Refresh for Latest Update
              </button>
            </div>
          </div>
      </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send(`<div style="padding: 20px; color: red;">Error: ${error.message}</div>`);
  }
});

// Routes
app.use("/api", analyzeRoutes);
app.use("/api/users", userRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/text-analysis")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});