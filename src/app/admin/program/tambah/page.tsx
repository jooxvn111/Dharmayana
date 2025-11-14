"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProgramTambahPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    setGambar(file);

    if (file) setPreview(URL.createObjectURL(file));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    let imageUrl = "";
    try {
      if (gambar) {
        const form = new FormData();
        form.append("file", gambar);

        const upload = await fetch("/api/upload", { method: "POST", body: form });
        const resUp = await upload.json();
        imageUrl = resUp.url;
      }

      await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, deskripsi, gambar: imageUrl }),
      });

      toast.success("Program berhasil ditambahkan!");
      setTimeout(() => router.push("/admin/program"), 1200);

    } catch (err) {
      toast.error("Gagal menambahkan program!");
    }
  }

  return (
    <div className="container py-4">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Tambah Program Kerja</h2>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          Kembali
        </button>
      </div>

      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit} className="row g-3">

          {/* Nama Program */}
          <div className="col-md-12">
            <label className="form-label fw-bold">Nama Program</label>
            <input
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Masukkan nama program kerja"
            />
          </div>

          {/* Deskripsi */}
          <div className="col-md-12">
            <label className="form-label fw-bold">Deskripsi Program</label>
            <textarea
              className="form-control"
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              placeholder="Masukkan deskripsi program"
            ></textarea>
          </div>

          {/* Upload Gambar */}
          <div className="col-md-12">
            <label className="form-label fw-bold">Gambar Program</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImage} />

            {preview && (
              <div className="mt-3">
                <p className="fw-bold mb-1">Preview Gambar:</p>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "220px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </div>

          {/* Button Submit */}
          <div className="col-md-12">
            <button className="btn btn-primary px-4 py-2">
              Simpan Program
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
