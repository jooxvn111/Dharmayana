import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Program from "@/models/Program";

// Definisi Tipe Params (Promise)
type Props = {
  params: Promise<{
    id: string;
  }>;
};

// GET Data by ID
export async function GET(request: Request, props: Props) {
  try {
    // WAJIB AWAIT PARAMS DULU
    const params = await props.params; 
    
    await dbConnect();
    const program = await Program.findById(params.id);

    if (!program) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(program);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// PUT (Update Data)
export async function PUT(request: Request, props: Props) {
  try {
    // WAJIB AWAIT PARAMS DULU
    const params = await props.params;
    
    await dbConnect();
    const body = await request.json(); // Mengambil data body dari frontend

    const updatedProgram = await Program.findByIdAndUpdate(
      params.id,
      {
        nama: body.nama,
        deskripsi: body.deskripsi,
        gambar: body.gambar,
        galeri: body.galeri // Update array galeri
      },
      { new: true }
    );

    if (!updatedProgram) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(updatedProgram);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update program" }, { status: 500 });
  }
}

// DELETE (Hapus Data)
export async function DELETE(request: Request, props: Props) {
    try {
      // WAJIB AWAIT PARAMS DULU
      const params = await props.params;

      await dbConnect();
      await Program.findByIdAndDelete(params.id);
      
      return NextResponse.json({ message: "Program deleted" });
    } catch (error) {
      return NextResponse.json({ error: "Gagal menghapus program" }, { status: 500 });
    }
}