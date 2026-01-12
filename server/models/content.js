import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  // שיוך למשתמש לצורך היסטוריה (מהקובץ של החברה)
  userEmail: {
    type: String,
    required: true,
    index: true // מוסיף אינדקס לחיפוש מהיר של היסטוריה
  },
  
  // תוצאות הניתוח המפורטות (מהקובץ של החברה)
  analysisData: [
    {
      word: { type: String, required: true },
      count: { type: Number, required: true }
    }
  ],

  // שדות נוספים מהניתוח שלך (חשוב להיסטוריה מלאה)
  riskLevel: {
    type: Number,
    default: 0
  },
  
  contextAnalysis: {
    type: String
  },
  
  recommendation: {
    type: String
  },

  // תאריך יצירה לצורך מיון ההיסטוריה מהחדש לישן
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Content", contentSchema);