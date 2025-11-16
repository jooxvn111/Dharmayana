"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBPH({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [nama, setNama] = useState("");
  const [posisi, setPosisi] = useState("");
  const [gambar, setGambar] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch(`/api/bph/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNama(data.nama);
        setPosisi(data.posisi);
        setGambar(data.gambar);
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let finalGambar = gambar;

    // Jika user upload file baru → upload file baru
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      finalGambar = uploadData.url;
    }

    // UPDATE DATA KE DATABASE
    await fetch(`/api/bph/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        posisi,
        gambar: finalGambar,
      }),
    });

    // redirect
    router.push("/admin/bph");
  };

  return (
    <div className="container mt-4">
      <h2>Edit BPH</h2>

      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input
          className="form-control"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <label className="mt-2">Posisi</label>
        <input
          className="form-control"
          value={posisi}
          onChange={(e) => setPosisi(e.target.value)}
        />

        <label className="mt-2">Gambar Sekarang</label>
        <br />
        {gambar && <img src={gambar} width={120} className="rounded mb-2" />}

        <label>Ganti Gambar</label>
        <input
          type="file"
          className="form-control"
          onChange={(e: any) => setFile(e.target.files[0])}
        />

        <button className="btn btn-primary mt-3">Update</button>
      </form>
    </div>
  );
}
