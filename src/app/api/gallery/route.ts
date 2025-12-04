import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Gallery from "@/models/gallery";

export async function GET() {
  try {
    await dbConnect();
    // Ambil data galeri, urutkan dari yang terbaru (descending)
    const galleries = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data gallery" },
      { status: 500 }
    );
  }
}