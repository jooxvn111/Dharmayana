import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect"; // PERBAIKAN 1: Pakai kurung kurawal { }
import Program from "@/models/Program";      // PERBAIKAN 2: Ganti 'program' jadi 'Program' (P besar)

export async function GET() {
  try {
    await dbConnect();
    const programs = await Program.find().sort({ createdAt: -1 });
    return NextResponse.json(programs);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Kita buat object baru agar memastikan field 'galeri' masuk
    // Walaupun user tidak kirim galeri, defaultnya array kosong []
    const created = await Program.create({
      nama: body.nama,
      deskripsi: body.deskripsi,
      gambar: body.gambar,       // String URL (Thumbnail)
      galeri: body.galeri || []  // Array of Strings URL (Foto dokumentasi)
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat program" }, { status: 500 });
  }
}