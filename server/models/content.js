import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
  // שדה ה-category הוסר מכאן כדי להתאים לבקשתכן
});

export default mongoose.model("Content", contentSchema);