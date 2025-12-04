"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:5000/api/gallery/${id}`);
        const data = await res.json();
        if (data.error) return toast.error("Data tidak ditemukan");

        setTitle(data.title || "");
        setPreview(data.url || "");
      } catch (err) {
        toast.error("Gagal memuat data");
      }
    }
    loadData();
  }, [id]);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (file) formData.append("file", file);

      const res = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        toast.error("Gagal update gallery");
      } else {
        toast.success("Gallery berhasil diperbarui!");
        setTimeout(() => router.push("/admin/gallery"), 1500);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <h3 className="mb-3">Edit Gallery</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Judul</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Gambar</label>
          {preview && (
            <img
              src={preview}
              alt={title}
              className="d-block mb-2"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-warning"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Update Gallery"}
        </button>
      </form>
    </div>
  );
}
