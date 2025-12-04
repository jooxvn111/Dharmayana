import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Bph from "@/models/bph";

export async function GET() {
  try {
    await dbConnect();
    const data = await Bph.find().sort({ createdAt: 1 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching BPH:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("Data Masuk:", body);

    const created = await Bph.create({
      nama: body.nama,
      jabatan: body.jabatan,
      kedudukan: body.kedudukan,
      divisi: body.divisi,
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
