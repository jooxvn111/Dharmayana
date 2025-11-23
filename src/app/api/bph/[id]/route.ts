import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Bph from "@/models/bph";

type Props = {
  params: Promise<{ id: string }>;
};

// GET Single Data (Untuk Edit)
export async function GET(request: Request, props: Props) {
  try {
    const params = await props.params;
    await dbConnect();
    const member = await Bph.findById(params.id);
    if (!member) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// PUT (Update Data)
export async function PUT(request: Request, props: Props) {
  try {
    const params = await props.params;
    await dbConnect();
    const body = await request.json();

    const updatedMember = await Bph.findByIdAndUpdate(
      params.id,
      {
        nama: body.nama,
        jabatan: body.jabatan,
        divisi: body.divisi,
        parentId: body.parentId || null, // Update Atasan
        gambar: body.gambar
      },
      { new: true }
    );

    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

// DELETE (Hapus Data)
export async function DELETE(request: Request, props: Props) {
  try {
    const params = await props.params;
    await dbConnect();
    await Bph.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}