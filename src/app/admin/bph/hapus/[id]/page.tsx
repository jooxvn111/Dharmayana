"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBPH() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [posisi, setPosisi] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let image = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      image = uploadData.url;
    }

    await fetch("/api/bph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name, 
        posisi, 
        image 
      }),
    });

    router.push("/admin/bph");
  };

  return (
    <div className="container mt-4">
      <h2>Tambah BPH</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <label>Nama</label>
        <input
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mt-2">Posisi</label>
        <input
          className="form-control"
          onChange={(e) => setPosisi(e.target.value)}
        />

        <label className="mt-2">Foto</label>
        <input
          type="file"
          className="form-control"
          onChange={(e: any) => setFile(e.target.files[0])}
        />

        <button className="btn btn-primary mt-3">Simpan</button>
      </form>
    </div>
  );
}
