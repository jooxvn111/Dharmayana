"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TambahBphPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [divisi, setDivisi] = useState("BPH");
  const [parentId, setParentId] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [searchParent, setSearchParent] = useState("");
  const [existingMembers, setExistingMembers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/bph");
        const data = await res.json();
        if (Array.isArray(data)) setExistingMembers(data);
      } catch {}
    }
    fetchData();
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }
    if (file.size > 2000000) {
      toast.error("File terlalu besar (max 2MB)");
      return;
    }
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  async function uploadFile(file: File) {
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      return data.url || "";
    } catch {
      toast.error("Gagal upload gambar");
      return "";
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (gambar) {
        imageUrl = await uploadFile(gambar);
      }

      const payload = {
        nama,
        jabatan,
        divisi,
        gambar: imageUrl,
        parentId: parentId || null,
        kedudukan: "General",
      };

      const res = await fetch("/api/bph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success("Berhasil disimpan!");
      setTimeout(() => router.push("/admin/bph"), 1500);
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  const filteredParents = existingMembers.filter((m) => {
    const q = searchParent.toLowerCase();
    return (
      m.divisi === divisi &&
      ((m.nama || "").toLowerCase().includes(q) ||
        (m.jabatan || "").toLowerCase().includes(q))
    );
  });

  return (
    <div className="container py-4 max-w-xl mx-auto">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold">Tambah Anggota Struktur</h3>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          Kembali
        </button>
      </div>

      <div className="card p-4 shadow-sm bg-white">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label fw-bold">Divisi</label>
            <select
              className="form-select"
              value={divisi}
              onChange={(e) => setDivisi(e.target.value)}
            >
              <option value="BPH">BPH</option>
              <option value="BD">BD</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Nama Lengkap</label>
            <input
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Jabatan</label>
            <input
              className="form-control"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              required
            />
          </div>

          <div className="col-12 my-2">
            <hr className="text-muted" />
            <p className="fw-bold text-primary mb-2">Pilih Atasan</p>
          </div>

          <div className="col-12 bg-light p-3 rounded border">
            <div className="mb-2">
              <label className="form-label small text-muted fw-bold">
                Cari Nama:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={searchParent}
                onChange={(e) => setSearchParent(e.target.value)}
              />
            </div>

            <label className="form-label small text-muted fw-bold">
              Hasil:
            </label>
            <select
              className="form-select"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              size={5}
            >
              <option value="">-- Tidak Ada --</option>
              {filteredParents.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.nama} — {m.jabatan}
                </option>
              ))}
              {filteredParents.length === 0 && (
                <option disabled>Tidak ditemukan...</option>
              )}
            </select>
          </div>

          <div className="col-12 mt-3">
            <label className="form-label fw-bold">Foto Profil</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImage}
            />
            {preview && (
              <img
                src={preview}
                className="mt-2 rounded-circle border"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          <div className="col-12 mt-4">
            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Struktur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
