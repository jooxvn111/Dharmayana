import mongoose, { Schema } from "mongoose";

const ProgramSchema = new Schema(
  {
    nama: { type: String, required: true },
    tanggal: { type: Date, required: true }, 
    deskripsi: { type: String, required: true },
    
    gambar: { type: String }, 

    galeri: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema);