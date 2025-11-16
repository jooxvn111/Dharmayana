import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Bph from "@/models/bph";

// GET BY ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await Bph.findById(params.id);
  if (!data) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  return NextResponse.json(data);
}

// UPDATE
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();

  const updated = await Bph.findByIdAndUpdate(
    params.id,
    { nama: body.nama, posisi: body.posisi, gambar: body.gambar },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deleted = await Bph.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}