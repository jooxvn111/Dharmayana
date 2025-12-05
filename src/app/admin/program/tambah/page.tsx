"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TambahProgramPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // ==== FIELD BARU ====
  const [tanggal, setTanggal] = useState("");

  const handleThumbnailChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function uploadFile(file: File) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error("Upload gagal");

    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let gambarUrl = "";

      if (gambar) {
        gambarUrl = await uploadFile(gambar);
      }

      const res = await fetch("http://localhost:5000/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          deskripsi,
          gambar: gambarUrl,
          tanggal, // ← DITAMBAHKAN
        }),
      });

      if (!res.ok) {
        toast.error("Gagal menambahkan program");
        return;
      }

      toast.success("Program berhasil ditambahkan");
      setTimeout(() => router.push("/admin/program"), 1300);
    } catch {
      toast.error("Terjadi kesalahan server");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 750 }}>
      <ToastContainer />

      <div className="mb-4">
        <h2 className="fw-bold text-dark">Tambah Program</h2>
        <p className="text-muted">Isi form berikut untuk menambahkan program baru.</p>
      </div>

      <div className="card shadow border-0 p-4">
        <form onSubmit={handleSubmit} className="row g-4">

          <div className="col-12">
            <label className="form-label fw-semibold">Nama Program</label>
            <input
              className="form-control form-control-lg"
              placeholder="Masukkan nama program..."
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          {/* ========== FIELD TANGGAL BARU ========== */}
          <div className="col-12">
            <label className="form-label fw-semibold">Tanggal Program</label>
            <input
              type="date"
              className="form-control form-control-lg"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>
          {/* ======================================== */}

          <div className="col-12">
            <label className="form-label fw-semibold">Deskripsi</label>
            <textarea
              className="form-control form-control-lg"
              rows={5}
              placeholder="Tulis deskripsi program..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Thumbnail Program</label>
            <div className="d-flex align-items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleThumbnailChange}
              />

              <img
                src={preview || "/images/placeholder.jpg"}
                className="rounded border"
                style={{
                  width: 150,
                  height: 120,
                  objectFit: "cover",
                  background: "#f8f9fa",
                }}
              />
            </div>
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary w-100 py-3 fw-bold fs-5"
              disabled={submitting}
            >
              {submitting ? "Menyimpan..." : "Tambah Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
