"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProgramEditPage({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [oldImage, setOldImage] = useState("");

  async function load() {
    const res = await fetch(`/api/program/${id}`);
    const data = await res.json();

    setNama(data.nama);
    setDeskripsi(data.deskripsi);
    setOldImage(data.gambar);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    let imageUrl = oldImage;

    if (gambar) {
      const form = new FormData();
      form.append("file", gambar);
      const upload = await fetch("/api/upload", { method: "POST", body: form });
      const resUp = await upload.json();
      imageUrl = resUp.url;
    }

    await fetch(`/api/program/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, deskripsi, gambar: imageUrl }),
    });

    router.push("/admin/program");
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Edit Program</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <div>
          <label>Nama Program</label>
          <input
            className="border p-2 w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div>
          <label>Deskripsi</label>
          <textarea
            className="border p-2 w-full"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        <div>
          <label>Gambar Lama</label>
          <img src={oldImage} className="w-40 rounded border my-2" />
        </div>

        <div>
          <label>Ganti Gambar (opsional)</label>
          <input type="file" onChange={(e) => setGambar(e.target.files?.[0] || null)} />
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
