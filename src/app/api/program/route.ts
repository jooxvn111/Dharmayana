import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Program from "@/models/Program";

export async function GET() {
  try {
    await dbConnect();
    // Urutkan berdasarkan tanggal acara (terdekat duluan), bukan tanggal dibuat
    const programs = await Program.find().sort({ tanggal: 1 }); 
    return NextResponse.json(programs);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validasi sederhana
    if (!body.nama || !body.tanggal || !body.deskripsi) {
        return NextResponse.json({ error: "Nama, Tanggal, dan Deskripsi wajib diisi" }, { status: 400 });
    }

    const created = await Program.create({
      nama: body.nama,
      tanggal: new Date(body.tanggal), // Pastikan format Date
      deskripsi: body.deskripsi,
      gambar: body.gambar,       
      galeri: body.galeri || []  
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat program" }, { status: 500 });
  }
}