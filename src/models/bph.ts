import mongoose, { Schema, model, models } from "mongoose";

const BphSchema = new Schema(
  {
    nama: { type: String, required: true },
    posisi: { type: String, required: true },
    gambar: { type: String, required: false },
  },
  { timestamps: true }
);

const Bph = models.Bph || model("Bph", BphSchema);
export default Bph;
