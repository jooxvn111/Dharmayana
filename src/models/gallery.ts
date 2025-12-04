import mongoose, { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true }, // Pastikan ini 'url', bukan 'image'
  },
  { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;