import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Program from "@/models/Program";

export async function GET() {
  await dbConnect();
  const programs = await Program.find().sort({ createdAt: -1 });
  return NextResponse.json(programs);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const created = await Program.create(body);
  return NextResponse.json(created);
}
