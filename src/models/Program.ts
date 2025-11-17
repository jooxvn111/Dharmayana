import mongoose, { Schema } from "mongoose";

const ProgramSchema = new Schema(
  {
    nama: String,
    deskripsi: String,
    gambar: String, 
  },
  { timestamps: true }
);

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema);
