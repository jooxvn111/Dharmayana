import mongoose from "mongoose";

// --- PERUBAHAN DI SINI ---
// Kita masukkan link database langsung (Hardcode) untuk test
// Pastikan username, password, dan nama database 'dharmayana' sudah benar
const MONGODB_URI = "mongodb+srv://clvn_DB:AYAMBOS123@cluster0.3p2hmik.mongodb.net/dharmayana?retryWrites=true&w=majority";
// -------------------------

if (!MONGODB_URI) {
  throw new Error("❌ DB_CONNECTION tidak ditemukan. Cek hardcode URI.");
}

let isConnected = false;

export const dbConnect = async () => {
  // Jika sudah connect, skip
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
  }
};