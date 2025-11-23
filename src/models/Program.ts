import mongoose, { Schema } from "mongoose";

const ProgramSchema = new Schema(
  {
    nama: { type: String, required: true },
    deskripsi: { type: String, required: true },
    
    // Gambar Utama (Thumbnail) - Hanya 1 string
    gambar: { type: String }, 

    // LIST GAMBAR BARU (Galeri) - Array of Strings
    // Tanpa baris di bawah ini, fitur multiple upload TIDAK AKAN DISIMPAN
    galeri: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

// Cek apakah model sudah ada, jika belum buat baru
export default mongoose.models.Program || mongoose.model("Program", ProgramSchema);