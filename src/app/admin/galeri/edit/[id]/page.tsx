"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function EditGallery({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Ambil data gallery
  useEffect(() => {
    fetch(`http://localhost:5000/api/gallery/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title || "");
        setUrl(data.url || "");
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let finalUrl = url;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      finalUrl = uploadData.url;
    }

    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url: finalUrl }),
    });

    router.push("/admin/gallery");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Gambar</h2>
      <form onSubmit={handleSubmit}>
        <label>Judul</label>
        <input className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Gambar Sekarang</label>
        {url && <img src={url} width={120} className="d-block mb-2 rounded" />}

        <label>Ganti Gambar</label>
        <input type="file" className="form-control mb-2" onChange={e => setFile(e.target.files![0])} />

        <button className="btn btn-primary mt-2">Update</button>
      </form>
    </div>
  );
}
