import mongoose, { Schema } from "mongoose";

const BphSchema = new Schema(
  {
    nama: { type: String, required: true },
    jabatan: { type: String, required: true }, // Contoh: "Ketua Umum"
    
    // === FIELD BARU: KEDUDUKAN (KELOMPOK) ===
    // Contoh: "BPH Inti", "Koordinator Divisi", "Anggota"
    kedudukan: { type: String, required: true }, 
    
    gambar: { type: String },
    divisi: { 
      type: String, 
      enum: ['BPH', 'BD'], 
      required: true,
      default: 'BPH' 
    },
    parentId: { 
      type: Schema.Types.ObjectId, 
      ref: "Bph", 
      default: null 
    }
  },
  { timestamps: true }
);

export default mongoose.models.Bph || mongoose.model("Bph", BphSchema);