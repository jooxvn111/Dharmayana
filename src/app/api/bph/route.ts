import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Bph from "@/models/bph"; // Pastikan import menggunakan 'B' besar sesuai nama file

// GET: Ambil semua data anggota
export async function GET() {
  try {
    await dbConnect();
    // Mengambil semua data urut berdasarkan waktu dibuat
    const data = await Bph.find().sort({ createdAt: 1 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching BPH:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST: Tambah Anggota Baru
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("Data Masuk:", body); // Debugging di terminal

    const created = await Bph.create({
      nama: body.nama,
      jabatan: body.jabatan,
      
      // Field Baru: KEDUDUKAN (Grouping Jabatan)
      // Pastikan model Bph.ts sudah diupdate dengan field ini
      kedudukan: body.kedudukan, 

      divisi: body.divisi, // 'BPH' atau 'BD'
      
      // Logika Penting: Jika parentId kosong string (""), ubah jadi null
      parentId: body.parentId || null, 
      
      gambar: body.gambar,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("Error creating BPH:", error);
    return NextResponse.json({ 
      error: error.message || "Gagal menambah data" 
    }, { status: 500 });
  }
}