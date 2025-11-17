import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar (jpg/png/svg/webp)" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // Full path penyimpanan
    const filePath = path.join(uploadDir, fileName);

    // Convert File → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Simpan file
    await writeFile(filePath, buffer);

    // URL untuk disimpan di database
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "Upload berhasil",
      url: fileUrl,       // URL ini yang nanti kamu simpan ke MongoDB
      fileName,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { error: "Upload gagal, coba lagi nanti" },
      { status: 500 }
    );
  }
}
