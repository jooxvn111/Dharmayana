"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TambahBphPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form Data
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [divisi, setDivisi] = useState("BPH");
  const [parentId, setParentId] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Fitur Search Atasan
  const [searchParent, setSearchParent] = useState(""); 

  // Data Master
  const [existingMembers, setExistingMembers] = useState<any[]>([]);

  // 1. Load Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/bph");
        const data = await res.json();
        if (Array.isArray(data)) {
          setExistingMembers(data);
        }
      } catch (err) {
        console.error("Gagal load data", err);
      }
    }
    fetchData();
  }, []);

  // 2. Handle Foto
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function uploadFile(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url;
  }

  // 3. Submit
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (gambar) imageUrl = await uploadFile(gambar);

      const payload = {
        nama,
        jabatan,
        divisi,
        gambar: imageUrl,
        parentId: parentId || null,
        kedudukan: "General" // Default value agar database tidak error
      };

      const res = await fetch("/api/bph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Berhasil disimpan!");
        setTimeout(() => router.push("/admin/bph"), 1500);
      } else {
        toast.error("Gagal menyimpan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  // LOGIC SEARCH: Filter nama/jabatan + Filter Divisi
  const filteredParents = existingMembers.filter(m => {
    const matchDivisi = m.divisi === divisi;
    const matchSearch = m.nama.toLowerCase().includes(searchParent.toLowerCase()) || 
                        m.jabatan.toLowerCase().includes(searchParent.toLowerCase());
    return matchDivisi && matchSearch;
  });

  return (
    <div className="container py-4 max-w-xl mx-auto">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold">Tambah Anggota Struktur</h3>
        <button className="btn btn-secondary" onClick={() => router.back()}>Kembali</button>
      </div>

      <div className="card p-4 shadow-sm bg-white">
        <form onSubmit={handleSubmit} className="row g-3">
          
          {/* DIVISI */}
          <div className="col-12">
            <label className="form-label fw-bold">Divisi</label>
            <select className="form-select" value={divisi} onChange={(e) => setDivisi(e.target.value)}>
              <option value="BPH">BPH (Pengurus Harian)</option>
              <option value="BD">BD (Badan Dharmaduta)</option>
            </select>
          </div>

          {/* NAMA & JABATAN */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Nama Lengkap</label>
            <input className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Jabatan</label>
            <input className="form-control" value={jabatan} onChange={(e) => setJabatan(e.target.value)} required />
          </div>

          {/* --- BAGIAN PILIH ATASAN (Disederhanakan) --- */}
          <div className="col-12 my-2">
            <hr className="text-muted" />
            <p className="fw-bold text-primary mb-2">Pilih Atasan (Parent)</p>
          </div>

          <div className="col-12 bg-light p-3 rounded border">
            {/* KOTAK CARI */}
            <div className="mb-2">
                <label className="form-label small text-muted fw-bold">Cari Nama Atasan:</label>
                <input 
                    type="text" 
                    className="form-control form-control-sm"
                    placeholder="Ketik nama atasan (cth: Tannia)..."
                    value={searchParent}
                    onChange={(e) => setSearchParent(e.target.value)}
                />
            </div>

            {/* DROPDOWN HASIL */}
            <label className="form-label small text-muted fw-bold">Hasil Pencarian:</label>
            <select 
              className="form-select" 
              value={parentId} 
              onChange={(e) => setParentId(e.target.value)}
              size={5} // List memanjang ke bawah (5 baris)
            >
              <option value="">-- Tidak Ada (Jadikan Root/Ketua) --</option>
              
              {filteredParents.map((m) => (
                  <option key={m._id} value={m._id}>
                     {m.nama} — {m.jabatan}
                  </option>
              ))}

              {filteredParents.length === 0 && (
                <option disabled>Tidak ditemukan...</option>
              )}
            </select>
            <small className="text-muted d-block mt-1">
              *Klik nama di dalam kotak untuk memilih.
            </small>
          </div>

          {/* FOTO */}
          <div className="col-12 mt-3">
            <label className="form-label fw-bold">Foto Profil</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImage} />
            {preview && <img src={preview} className="mt-2 rounded-circle border" style={{width: '80px', height: '80px', objectFit: 'cover'}} />}
          </div>

          <div className="col-12 mt-4">
            <button className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Struktur"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}