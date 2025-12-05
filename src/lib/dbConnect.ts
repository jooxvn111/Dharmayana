import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://clvn_DB:AYAMBOS123@cluster0.3p2hmik.mongodb.net/dharmayana?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("DB_CONNECTION tidak ditemukan.");
}

let isConnected = false;

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
};
