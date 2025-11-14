"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface Program {
  _id: string;
  nama: string;
  deskripsi: string;
}

export default function ProgramPage() {
  const router = useRouter();
  const [program, setProgram] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // LOAD DATA
  const loadProgram = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/program");
      const data = await res.json();
      setProgram(data);
      setLoading(false);
    } catch (err) {
      toast.error("Gagal memuat data");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgram();
  }, []);

  // DELETE HANDLER
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus program ini?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/program/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Gagal menghapus program!");
      return;
    }

    toast.success("Program berhasil dihapus!");
    loadProgram(); // Refresh data
  };

  return (
    <div className="container mt-4">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Daftar Program Kerja</h2>

        {/* 🔥 Tombol tambah */}
        <button
          className="btn btn-primary"
          onClick={() => router.push("/admin/program/tambah")}
        >
          + Tambah Program
        </button>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : program.length === 0 ? (
        <p>Tidak ada program kerja.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Program</th>
              <th>Deskripsi</th>
              <th style={{ width: "150px" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {program.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.deskripsi}</td>
                <td className="d-flex gap-2">

                  {/* 🔥 TOMBOL EDIT */}
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => router.push(`/admin/program/edit/${item._id}`)}
                  >
                    Edit
                  </button>

                  {/* 🔥 TOMBOL HAPUS */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Hapus
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
