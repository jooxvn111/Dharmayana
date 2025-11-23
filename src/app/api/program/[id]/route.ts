import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Program from "@/models/Program";

// Tipe Params untuk Next.js 15
type Props = {
  params: Promise<{ id: string }>;
};

// 1. GET: Ambil Data (Perbaikan await params)
export async function GET(req: Request, { params }: Props) {
  try {
    const { id } = await params; // <--- WAJIB AWAIT DISINI
    await dbConnect();

    const program = await Program.findById(id);
    if (!program) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(program);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// 2. PUT: Update Data (Perbaikan await params)
export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params; // <--- WAJIB AWAIT DISINI
    await dbConnect();
    const body = await req.json();

    const program = await Program.findById(id);
    if (!program) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }

    // Update Field
    program.nama = body.nama || program.nama;
    program.deskripsi = body.deskripsi || program.deskripsi;
    
    // Update Tanggal (Penting)
    if (body.tanggal) {
      program.tanggal = body.tanggal;
    }

    if (body.gambar) {
      program.gambar = body.gambar;
    }

    await program.save();

    return NextResponse.json(program);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengupdate program" }, { status: 500 });
  }
}

// 3. DELETE: Hapus Data (Perbaikan await params)
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params; // <--- WAJIB AWAIT DISINI
    await dbConnect();
    
    const deleted = await Program.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Program berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus program" }, { status: 500 });
  }
}