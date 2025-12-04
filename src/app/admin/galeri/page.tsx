"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Gallery {
  _id: string;
  title: string;
  url: string;
}

export default function GalleryPage() {
  const [data, setData] = useState<Gallery[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus gambar ini?")) return;
    await fetch(`http://localhost:5000/api/gallery/${id}`, { method: "DELETE" });
    setData(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Gallery</h1>
      <Link href="/admin/gallery/tambah" className="btn btn-primary mb-3">+ Tambah Gambar</Link>

      <div className="row">
        {data.map((item) => (
          <div key={item._id} className="col-md-3 mb-3">
            <div className="card">
              <img src={item.url} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <Link href={`/admin/gallery/edit/${item._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
