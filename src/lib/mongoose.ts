import mongoose from "mongoose";

const isProduction = process.env.NODE_ENV === "production";

const uri = isProduction
  ? process.env.MONGODB_URI || ""
  : process.env.MONGODB_URI_DEV || "";

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(uri);
    console.log(
      `✅ Connected to MongoDB Atlas (${isProduction ? "PROD" : "DEV"})`
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
