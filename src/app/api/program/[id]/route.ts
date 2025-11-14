import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Program from "@/models/Program";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();
  const program = await Program.findById(id);

  if (!program) {
    return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(program);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  await dbConnect();

  const updated = await Program.findByIdAndUpdate(id, body, { new: true });

  if (!updated) {
    return NextResponse.json(
      { error: "Program tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();

  const deleted = await Program.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Program tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Program berhasil dihapus" });
}
