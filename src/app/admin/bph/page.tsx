"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminBphPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // STATE BARU: Search & Filter
  const [search, setSearch] = useState("");
  const [filterDivisi, setFilterDivisi] = useState("ALL"); // Options: ALL, BPH, BD

  // Ambil data API
  async function fetchMembers() {
    try {
      const res = await fetch("/api/bph");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchMembers(); }, []);

  async function handleDelete(id: string) {
    if(!confirm("Hapus anggota ini? Struktur di bawahnya mungkin akan terputus.")) return;
    
    const res = await fetch(`/api/bph/${id}`, { method: "DELETE" });
    if(res.ok) {
      toast.success("Berhasil dihapus");
      fetchMembers();
    } else {
      toast.error("Gagal menghapus");
    }
  }

  const getParentName = (parentId: string) => {
    const parent = members.find(m => m._id === parentId);
    return parent ? parent.nama : "ROOT (Paling Atas)";
  };

  // === LOGIKA FILTERING ===
  const filteredMembers = members.filter((member) => {
    // 1. Filter Divisi
    const matchDivisi = filterDivisi === "ALL" || member.divisi === filterDivisi;
    
    // 2. Filter Search (Nama atau Jabatan)
    const query = search.toLowerCase();
    const matchSearch = 
      member.nama.toLowerCase().includes(query) || 
      member.jabatan.toLowerCase().includes(query);

    return matchDivisi && matchSearch;
  });

  return (
    <div className="container py-4">
      <ToastContainer />
      
      {/* Header & Tombol Tambah */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Kelola Struktur Organisasi</h2>
        <Link href="/admin/bph/tambah">
          <button className="btn btn-primary">+ Tambah Anggota</button>
        </Link>
      </div>

      {/* === AREA FILTER & SEARCH === */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body bg-light rounded d-flex flex-wrap gap-3 align-items-end">
            
            {/* Filter Divisi */}
            <div className="flex-grow-0">
                <label className="form-label small fw-bold text-muted">Filter Divisi</label>
                <select 
                    className="form-select" 
                    value={filterDivisi}
                    onChange={(e) => setFilterDivisi(e.target.value)}
                    style={{minWidth: '150px'}}
                >
                    <option value="ALL">Semua Divisi</option>
                    <option value="BPH">BPH (Pengurus Harian)</option>
                    <option value="BD">BD (Badan Dharmaduta)</option>
                </select>
            </div>

            {/* Search Bar */}
            <div className="flex-grow-1">
                <label className="form-label small fw-bold text-muted">Cari Nama / Jabatan</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Ketik nama anggota..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Counter Jumlah Data */}
            <div className="align-self-center pb-1">
                <span className="badge bg-secondary p-2">Total: {filteredMembers.length} Data</span>
            </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="p-3 text-center" style={{width: '50px'}}>No</th>
                  <th>Foto</th>
                  <th>Nama & Jabatan</th>
                  <th>Divisi</th>
                  <th>Atasan (Parent)</th>
                  <th className="text-end pe-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* Render Filtered Members */}
                {filteredMembers.map((m, index) => (
                  <tr key={m._id}>
                    {/* NO URUT */}
                    <td className="text-center fw-bold text-muted">{index + 1}</td>
                    
                    <td>
                      <img 
                        src={m.gambar || "/images/default-profile.jpg"} 
                        className="rounded-circle border" 
                        style={{width:'45px', height:'45px', objectFit:'cover'}} 
                        alt={m.nama}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{m.nama}</div>
                      <div className="small text-muted">{m.jabatan}</div>
                    </td>
                    <td>
                      <span className={`badge ${m.divisi === 'BPH' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {m.divisi}
                      </span>
                    </td>
                    <td className="text-muted small">
                       {getParentName(m.parentId)}
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-inline-flex gap-2">
                        <Link href={`/admin/bph/edit/${m._id}`}>
                          <button className="btn btn-sm btn-warning text-white fw-bold" title="Edit">
                            Edit
                          </button>
                        </Link>
                        <button 
                            onClick={() => handleDelete(m._id)} 
                            className="btn btn-sm btn-danger fw-bold" 
                            title="Hapus"
                        >
                            Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* State Kosong */}
                {filteredMembers.length === 0 && !loading && (
                    <tr>
                        <td colSpan={6} className="text-center py-5 text-muted fst-italic">
                            Tidak ada data yang cocok dengan pencarian.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}