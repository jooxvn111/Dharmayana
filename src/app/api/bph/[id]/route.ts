import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Bph from "@/models/bph";

// GET /api/bph/[id]
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await dbConnect();
    const item = await Bph.findById(id);

    return NextResponse.json(item || {}); // Selalu return JSON
  } catch (err) {
    console.error("API GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/bph/[id]
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const body = await req.json();

    const updated = await Bph.findByIdAndUpdate(
      id,
      {
        nama: body.nama,
        posisi: body.posisi,
        gambar: body.gambar,
      },
      { new: true }
    );

    return NextResponse.json(updated || {});
  } catch (err) {
    console.error("API PUT error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/bph/[id]
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await dbConnect();
    const deleted = await Bph.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (err) {
    console.error("API DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
