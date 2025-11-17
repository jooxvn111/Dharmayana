import mongoose, { Schema } from "mongoose";

const BphSchema = new Schema(
  {
    nama: { type: String, required: true },
    posisi: { type: String, required: true },
    gambar: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Bph || mongoose.model("Bph", BphSchema);
