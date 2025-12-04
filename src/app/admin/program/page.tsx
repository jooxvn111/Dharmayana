"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Program {
  _id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
}

export default function ProgramPage() {
  const [data, setData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/program");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json: Program[] = await res.json();
      setData(json);
    } catch (err) {
      console.error("Gagal mengambil data program:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus program ini?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/program/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        load();
      } else {
        alert("Gagal menghapus program.");
      }
    } catch (err) {
      console.error("Gagal menghapus:", err);
      alert("Terjadi kesalahan saat menghapus program.");
    }
  };

  if (loading) {
    return <div className="text-center p-5">⏳ Memuat data...</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h1 className="fw-bold text-primary">Daftar Program</h1>

        <Link href="/admin/program/tambah">
          <button className="btn btn-primary d-flex align-items-center shadow-sm">
            <FaPlus className="me-2" /> Tambah Program
          </button>
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="alert alert-info text-center mt-5">
          <p className="lead mb-0">Belum ada program yang terdaftar.</p>
          <small className="text-muted">Klik "Tambah Program" untuk mulai.</small>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th style={{ width: "80px" }}>Gambar</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th style={{ width: "160px" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.gambar}
                      alt={p.nama}
                      className="img-fluid rounded"
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    />
                  </td>

                  <td className="fw-semibold">{p.nama}</td>

                  <td className="text-muted">
                    {p.deskripsi?.length > 100
                      ? p.deskripsi.substring(0, 100) + "..."
                      : p.deskripsi}
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      <Link href={`/admin/program/edit/${p._id}`}>
                        <button className="btn btn-sm btn-outline-warning">
                          <FaEdit className="me-1" /> Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <FaTrash className="me-1" /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
