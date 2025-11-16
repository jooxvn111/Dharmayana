"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBPH() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [posisi, setPosisi] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let gambar = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await uploadRes.json();
      gambar = data.url;
    }

    await fetch("/api/bph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, posisi, gambar }),
    });

    router.push("/admin/bph");
  };

  return (
    <div className="container mt-4">
      <h2>Tambah BPH</h2>

      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input className="form-control" onChange={(e) => setNama(e.target.value)} />

        <label className="mt-2">Posisi</label>
        <input className="form-control" onChange={(e) => setPosisi(e.target.value)} />

        <label className="mt-2">Gambar</label>
        <input type="file" className="form-control" onChange={(e: any) => setFile(e.target.files[0])} />

        <button className="btn btn-primary mt-3">Simpan</button>
      </form>
    </div>
  );
}
