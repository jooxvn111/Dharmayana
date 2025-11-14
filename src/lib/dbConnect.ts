// src/lib/dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_CONNECTION as string;

if (!MONGODB_URI) {
  throw new Error("❌ DB_CONNECTION tidak ditemukan di .env.local");
}

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
  }
};
