"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProgramPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`http://localhost:5000/api/program/${id}`);
        const data = await res.json();

        setNama(data.nama);
        setDeskripsi(data.deskripsi);
        setGambar(data.gambar);
      } catch (err) {
        console.error("Gagal fetch:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) loadData();
  }, [id]);

  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      alert("Gagal upload gambar");
      return;
    }

    const data = await res.json();
    setGambar(data.url);
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:5000/api/program/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, deskripsi, gambar }),
    });

    if (res.ok) {
      router.push("/admin/program");
    } else {
      alert("Gagal update program");
    }
  };

  if (loading) return <div className="text-center p-5">⏳ Memuat data...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="fw-bold mb-4 text-primary border-bottom pb-2">
            Edit Program
          </h2>

          <div className="mb-3">
            <label className="fw-semibold mb-1">Nama Program</label>
            <input
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama program..."
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold mb-1">Deskripsi</label>
            <textarea
              className="form-control"
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi program..."
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold mb-1">Thumbnail</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => e.target.files && uploadFile(e.target.files[0])}
            />
          </div>

          {gambar && (
            <div className="text-center mb-4">
              <img
                src={gambar}
                alt="Thumbnail"
                className="rounded border"
                style={{
                  width: 170,
                  height: 130,
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <button
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
            onClick={handleSubmit}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
