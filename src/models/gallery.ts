import mongoose, { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true }, 
  },
  { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;