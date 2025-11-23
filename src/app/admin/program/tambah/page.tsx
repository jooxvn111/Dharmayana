"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProgramTambahPage() {
  const router = useRouter();

  // State Form
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState(""); // Input Tanggal
  const [deskripsi, setDeskripsi] = useState("");
  
  // State Gambar
  const [gambar, setGambar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [filesGaleri, setFilesGaleri] = useState<File[]>([]);
  const [previewsGaleri, setPreviewsGaleri] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle Gambar Utama
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Galeri
  const handleGalleryImages = (e: any) => {
    const selectedFiles = Array.from(e.target.files) as File[];
    setFilesGaleri((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewsGaleri((prev) => [...prev, ...newPreviews]);
  };

  const removeGalleryImage = (index: number) => {
    setFilesGaleri((prev) => prev.filter((_, i) => i !== index));
    setPreviewsGaleri((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload Function Mockup (Sesuaikan dengan API upload kamu)
  async function uploadFileToApi(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Gagal upload");
    const data = await res.json();
    return data.url;
  }

  // Submit
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsUploading(true);

    try {
      if (!tanggal) {
        toast.error("Wajib isi tanggal kegiatan!");
        setIsUploading(false);
        return;
      }
      if (!gambar) {
        toast.error("Wajib upload thumbnail!");
        setIsUploading(false);
        return;
      }

      // 1. Upload Thumbnail
      const mainImageUrl = await uploadFileToApi(gambar);

      // 2. Upload Galeri
      const galleryUrls = [];
      for (const file of filesGaleri) {
        const url = await uploadFileToApi(file);
        galleryUrls.push(url);
      }

      // 3. Simpan Data ke DB
      const res = await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          tanggal, // Kirim tanggal ke backend
          deskripsi,
          gambar: mainImageUrl,
          galeri: galleryUrls
        }),
      });

      if (res.ok) {
        toast.success("Program berhasil disimpan!");
        setTimeout(() => router.push("/admin/program"), 1500);
      } else {
        toast.error("Gagal menyimpan program");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="fw-bold mb-4">Tambah Program Baru</h2>
      
      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          
          {/* Nama */}
          <div className="mb-3">
            <label className="form-label fw-bold">Nama Program</label>
            <input className="form-control" value={nama} onChange={e => setNama(e.target.value)} required />
          </div>

          {/* Tanggal (FITUR BARU) */}
          <div className="mb-3">
            <label className="form-label fw-bold text-danger">Tanggal Kegiatan</label>
            <input 
              type="date" 
              className="form-control" 
              value={tanggal} 
              onChange={e => setTanggal(e.target.value)} 
              required 
            />
            <small className="text-muted">Tanggal ini akan muncul di kalender.</small>
          </div>

          {/* Deskripsi */}
          <div className="mb-3">
            <label className="form-label fw-bold">Deskripsi</label>
            <textarea className="form-control" rows={3} value={deskripsi} onChange={e => setDeskripsi(e.target.value)} required />
          </div>

          {/* Gambar Utama */}
          <div className="mb-3">
            <label className="form-label fw-bold">Thumbnail Utama</label>
            <input type="file" className="form-control" onChange={handleImage} accept="image/*" required />
            {preview && <img src={preview} className="mt-2 rounded" style={{height: 100}} />}
          </div>

          {/* Galeri */}
          <div className="mb-3">
            <label className="form-label fw-bold">Galeri (Opsional)</label>
            <input type="file" className="form-control" onChange={handleGalleryImages} multiple accept="image/*" />
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {previewsGaleri.map((src, idx) => (
                <div key={idx} className="position-relative">
                  <img src={src} style={{height: 80, width: 80, objectFit: 'cover'}} className="rounded border" />
                  <button type="button" onClick={() => removeGalleryImage(idx)} className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0 px-1">&times;</button>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary w-100" disabled={isUploading}>
            {isUploading ? "Menyimpan..." : "Simpan Program"}
          </button>
        </form>
      </div>
    </div>
  );
}