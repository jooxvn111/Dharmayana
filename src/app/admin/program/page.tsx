"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Program = {
  _id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
  tanggal: string;
};

export default function ProgramPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & filter state
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Load data dari backend
  async function loadData() {
    try {
      const res = await fetch("http://localhost:5000/api/program");
      const data = await res.json();
      setPrograms(data);
      setFilteredPrograms(data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Filtering setiap kali search atau tanggal berubah
  useEffect(() => {
    let filtered = programs;

    // Filter berdasarkan search nama
    if (search) {
      filtered = filtered.filter((p) =>
        p.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter berdasarkan tanggal start
    if (startDate) {
      filtered = filtered.filter(
        (p) => p.tanggal && new Date(p.tanggal) >= new Date(startDate)
      );
    }

    // Filter berdasarkan tanggal end
    if (endDate) {
      filtered = filtered.filter(
        (p) => p.tanggal && new Date(p.tanggal) <= new Date(endDate)
      );
    }

    setFilteredPrograms(filtered);
  }, [search, startDate, endDate, programs]);

  async function handleDelete(id: string) {
    if (!confirm("Hapus program ini?")) return;

    await fetch(`http://localhost:5000/api/program/${id}`, {
      method: "DELETE",
    });

    setPrograms((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) return <div className="p-4">Memuat data...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: 1050 }}>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">Daftar Program</h2>
        <Link href="/admin/program/tambah" className="btn btn-primary">
          Tambah Program
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cari nama program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearch("");
            setStartDate("");
            setEndDate("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="table-responsive shadow-sm border rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th style={{ width: "80px" }}>Gambar</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th style={{ width: "160px" }}>Tanggal</th>
              <th style={{ width: "160px" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredPrograms.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.gambar && p.gambar.trim() !== "" ? (
                    <img
                      src={p.gambar}
                      style={{
                        width: 70,
                        height: 55,
                        objectFit: "cover",
                        borderRadius: 6,
                        background: "#f2f2f2",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 70,
                        height: 55,
                        background: "#e0e0e0",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#777",
                        fontSize: 12,
                      }}
                    >
                      No Image
                    </div>
                  )}
                </td>

                <td className="fw-semibold">{p.nama}</td>
                <td style={{ maxWidth: 350 }}>{p.deskripsi}</td>
                <td>
                  {p.tanggal
                    ? new Date(p.tanggal).toLocaleDateString("id-ID")
                    : "-"}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      href={`/admin/program/edit/${p._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPrograms.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-3">
                  Tidak ada data program.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
