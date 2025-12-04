"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahGalleryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("Pilih file gambar dulu!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const res = await fetch("http://localhost:5000/api/gallery", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.error) return alert("Gagal tambah gallery!");
    router.push("/admin/gallery");
  };

  return (
    <div className="container mt-4">
      <h2>Tambah Gallery</h2>
      <form onSubmit={handleSubmit}>
        <label>Judul</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="mt-2">Gambar</label>
        <input type="file" className="form-control" onChange={(e: any) => setFile(e.target.files[0])} />

        <button className="btn btn-primary mt-3">Simpan</button>
      </form>
    </div>
  );
}
