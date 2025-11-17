"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BphPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/bph")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Yakin hapus?");
    if (!ok) return;

    await fetch(`/api/bph/${id}`, { method: "DELETE" });

    setData((prev) => prev.filter((item: any) => item._id !== id));
  };

  return (
    <div>
      <h1>Data BPH</h1>

      <Link href="/admin/bph/tambah" className="btn btn-primary">
        + Tambah BPH
      </Link>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Posisi</th>
            <th>Foto</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item._id}>
              <td>{item.nama}</td>
              <td>{item.posisi}</td>
              <td>
                {item.gambar ? (
                  <img src={item.gambar} width={60} className="rounded" />
                ) : (
                  "Tidak ada"
                )}
              </td>
              <td>
                <Link
                  href={`/admin/bph/edit/${item._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

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
    </div>
  );
}
