"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProgramPage() {
  // PENTING: Inisialisasi dengan array kosong []
  const [program, setProgram] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("all");

  async function loadData() {
    try {
      const res = await fetch("/api/program");
      const data = await res.json();

      // PENGAMAN: Cek apakah data benar-benar Array?
      if (Array.isArray(data)) {
        setProgram(data);
      } else {
        console.error("Data bukan array:", data);
        setProgram([]); // Kalau bukan array, paksa jadi array kosong biar gak error
      }
    } catch (err) {
      console.error("Gagal fetch program:", err);
      toast.error("Gagal memuat data program");
      setProgram([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Fungsi Hapus Program
  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus program ini?")) return;

    try {
      const res = await fetch(`/api/program/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Program berhasil dihapus");
        loadData(); // Refresh data
      } else {
        toast.error("Gagal menghapus program");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghapus");
    }
  }

  return (
    <div className="container py-4">
      <ToastContainer />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-secondary">Kelola Program Kerja</h2>
        <Link href="/admin/program/tambah">
          <button className="btn btn-primary">+ Tambah Program</button>
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="p-3 text-center" style={{ width: "50px" }}>No</th>
                  <th>Thumbnail</th>
                  <th>Nama Program</th>
                  <th>Deskripsi</th>
                  <th className="text-end pe-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* PENGAMAN DI SINI JUGA: Cek Array.isArray sebelum map */}
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5">Memuat data...</td>
                  </tr>
                ) : Array.isArray(program) && program.length > 0 ? (
                  program.map((item, index) => (
                    <tr key={item._id || index}>
                      <td className="text-center fw-bold text-muted">{index + 1}</td>
                      <td>
                        <img
                          src={item.gambar || "/images/default.jpg"}
                          alt={item.nama}
                          className="rounded border"
                          style={{ width: "60px", height: "40px", objectFit: "cover" }}
                        />
                      </td>
                      <td className="fw-bold">{item.nama}</td>
                      <td className="text-muted small">
                        {item.deskripsi?.substring(0, 50)}...
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-inline-flex gap-2">
                          <Link href={`/admin/program/edit/${item._id}`}>
                            <button className="btn btn-sm btn-warning text-white fw-bold">Edit</button>
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-sm btn-danger fw-bold"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      Belum ada program kerja.
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