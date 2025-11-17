import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Bph from "@/models/bph";

export async function GET() {
  await dbConnect();
  const data = await Bph.find().sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const created = await Bph.create({
    nama: body.nama,
    posisi: body.posisi,
    gambar: body.gambar,
  });

  return NextResponse.json(created);
}