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

  return (
    <div>
      <h1 className="mb-4">Data BPH</h1>

      <Link href="/admin/bph/tambah" className="btn btn-primary mb-3">
        + Tambah BPH
      </Link>

      {data.length === 0 ? (
        <p>Belum ada data BPH</p>
      ) : (
        <table className="table">
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
                    <img src={item.gambar} width={50} />
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
                  <Link
                    href={`/admin/bph/hapus/${item._id}`}
                    className="btn btn-danger btn-sm"
                  >
                    Hapus
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
