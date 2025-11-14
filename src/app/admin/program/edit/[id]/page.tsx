"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProgramPage() {
  const router = useRouter();
  const { id } = useParams();

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const res = await fetch(`/api/program/${id}`);
    const data = await res.json();

    setNama(data.nama);
    setDeskripsi(data.deskripsi);
    setGambar(data.gambar);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/program/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, deskripsi, gambar }),
    });

    if (res.ok) {
      toast.success("Program berhasil diperbarui!");
      setTimeout(() => {
        router.push("/admin/program");
      }, 1500);
    } else {
      toast.error("Gagal memperbarui program!");
    }

    setLoading(false);
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <ToastContainer />

      <h1 className="text-xl font-bold mb-4">Edit Program Kerja</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nama Program</label>
          <input
            className="border p-2 w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div>
          <label>Deskripsi</label>
          <textarea
            className="border p-2 w-full"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
