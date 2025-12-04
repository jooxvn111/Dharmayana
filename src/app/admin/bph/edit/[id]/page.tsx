"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBphPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);

  // Form Data
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [divisi, setDivisi] = useState("BPH");
  const [parentId, setParentId] = useState("");
  
  // Gambar
  const [gambarLama, setGambarLama] = useState("");
  const [gambarBaru, setGambarBaru] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Fitur Search Atasan
  const [searchParent, setSearchParent] = useState(""); 

  // Data Master
  const [existingMembers, setExistingMembers] = useState<any[]>([]);

  // Fetch data BPH by ID
  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        // Load Data Diri
        const resSelf = await fetch(`/api/bph/${id}`);
        const dataSelf = await resSelf.json();
        if (dataSelf.error) return toast.error("Data tidak ditemukan");

        setNama(dataSelf.nama);
        setJabatan(dataSelf.jabatan);
        setDivisi(dataSelf.divisi);
        setParentId(dataSelf.parentId || "");
        setGambarLama(dataSelf.gambar);

        // Load Semua Data untuk Dropdown
        const resAll = await fetch("/api/bph");
        const dataAll = await resAll.json();
        if (Array.isArray(dataAll)) {
            setExistingMembers(dataAll);
        }
      } catch (error) {
        toast.error("Gagal memuat data");
      }
    }
    loadData();
  }, [id]);

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambarBaru(file);
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImage = gambarLama;
      if (gambarBaru) finalImage = await uploadFile(gambarBaru);

      if (parentId === id) {
        toast.error("Tidak bisa memilih diri sendiri sebagai atasan!");
        setLoading(false);
        return;
      }

      const payload = {
        nama, jabatan, divisi, 
        gambar: finalImage,
        parentId: parentId || null,
        kedudukan: "General" // Default value
      };

      const res = await fetch(`/api/bph/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Data berhasil diperbarui!");
        setTimeout(() => router.push("/admin/bph"), 1500);
      } else {
        toast.error("Gagal update data");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  // FILTER LOGIC
  const filteredParents = existingMembers.filter(m => {
    const notSelf = m._id !== id;
    const matchDivisi = m.divisi === divisi;
    const matchSearch = m.nama.toLowerCase().includes(searchParent.toLowerCase()) || 
                        m.jabatan.toLowerCase().includes(searchParent.toLowerCase());
    return notSelf && matchDivisi && matchSearch;
  });

  return (
    <div className="container py-4 max-w-xl mx-auto">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold">Edit Anggota Struktur</h3>
        <button className="btn btn-secondary" onClick={() => router.back()}>Kembali</button>
      </div>

      <div className="card p-4 shadow-sm bg-white">
        <form onSubmit={handleSubmit} className="row g-3">
          
          <div className="col-md-12">
            <label className="form-label fw-bold">Divisi</label>
            <select className="form-select" value={divisi} onChange={(e) => setDivisi(e.target.value)}>
              <option value="BPH">BPH (Pengurus Harian)</option>
              <option value="BD">BD (Badan Dharmaduta)</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Nama Lengkap</label>
            <input className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Jabatan</label>
            <input className="form-control" value={jabatan} onChange={(e) => setJabatan(e.target.value)} required />
          </div>

          <div className="col-12 my-2">
            <hr className="text-muted" />
            <p className="fw-bold text-primary mb-2">Pilih Atasan (Parent)</p>
          </div>

          {/* --- SEARCH & SELECT ATASAN --- */}
          <div className="col-12 bg-light p-3 rounded border">
            <div className="mb-2">
                <label className="form-label small text-muted fw-bold">Cari Nama Atasan:</label>
                <input 
                    type="text" 
                    className="form-control form-control-sm"
                    placeholder="Ketik nama atasan..."
                    value={searchParent}
                    onChange={(e) => setSearchParent(e.target.value)}
                />
            </div>

            <label className="form-label small text-muted fw-bold">Hasil Pencarian:</label>
            <select 
              className="form-select" 
              value={parentId} 
              onChange={(e) => setParentId(e.target.value)}
              size={5}
            >
              <option value="">-- Tidak Ada (Root/Ketua) --</option>
              
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
            <div className="d-flex align-items-center gap-3 mb-2">
               <img src={preview || gambarLama || "/images/default-profile.jpg"} className="rounded-circle border" style={{width: '70px', height: '70px', objectFit: 'cover'}} />
               <input type="file" className="form-control" accept="image/*" onChange={handleImage} />
            </div>
          </div>

          <div className="col-12 mt-4">
            <button className="btn btn-warning w-100 py-2 text-white fw-bold" disabled={loading}>
              {loading ? "Menyimpan Perubahan..." : "Update Data"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}