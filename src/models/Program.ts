import mongoose, { Schema } from "mongoose";

const ProgramSchema = new Schema(
  {
    nama: { type: String, required: true },
    // Field baru untuk Tanggal Acara
    tanggal: { type: Date, required: true }, 
    deskripsi: { type: String, required: true },
    
    // Gambar Utama (Thumbnail)
    gambar: { type: String }, 

    // Galeri Dokumentasi
    galeri: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema);