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
  
  // Thumbnail Utama
  const [oldThumbnailUrl, setOldThumbnailUrl] = useState(""); // URL lama dari DB
  const [newThumbnailFile, setNewThumbnailFile] = useState<File | null>(null); // File baru jika user ganti
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  // Galeri
  const [existingGallery, setExistingGallery] = useState<string[]>([]); // URL lama dari DB
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]); // File baru yang mau ditambah
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // 1. Load Data Awal
  async function loadData() {
    try {
      const res = await fetch(`/api/program/${id}`);
      const data = await res.json();

      setNama(data.nama);
      setDeskripsi(data.deskripsi);
      setOldThumbnailUrl(data.gambar); // Simpan URL lama
      setExistingGallery(data.galeri || []); // Simpan Array URL lama
    } catch (err) {
      toast.error("Gagal memuat data");
    }
  }

  useEffect(() => { loadData(); }, []);

  // Handle Ganti Thumbnail
  const handleNewThumbnail = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewThumbnailFile(file);
      setPreviewThumbnail(URL.createObjectURL(file));
    }
  };

  // Handle Tambah Galeri Baru
  const handleNewGallery = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    setNewGalleryFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setNewGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Hapus Gambar Lama (Dari Database)
  const removeExistingGallery = (indexToRemove: number) => {
    setExistingGallery((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Hapus Gambar Baru (Yang belum diupload)
  const removeNewGallery = (indexToRemove: number) => {
    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // Fungsi Helper Upload
  async function uploadSingleFile(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url;
  }

  // SUBMIT
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      // A. Urus Thumbnail Utama
      let finalThumbnail = oldThumbnailUrl; // Default pakai yang lama
      if (newThumbnailFile) {
        // Kalau ada file baru, upload dulu
        finalThumbnail = await uploadSingleFile(newThumbnailFile);
      }

      // B. Urus Galeri
      // 1. Upload semua file baru di galeri
      const uploadedNewGalleryUrls = [];
      for (const file of newGalleryFiles) {
        const url = await uploadSingleFile(file);
        uploadedNewGalleryUrls.push(url);
      }

      // 2. Gabungkan URL lama (yang tidak dihapus) + URL baru
      const finalGallery = [...existingGallery, ...uploadedNewGalleryUrls];

      // C. Kirim ke API Update
      const res = await fetch(`/api/program/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          deskripsi,
          gambar: finalThumbnail,
          galeri: finalGallery, // Array gabungan
        }),
      });

      if (res.ok) {
        toast.success("Program berhasil diperbarui!");
        setTimeout(() => router.push("/admin/program"), 1500);
      } else {
        toast.error("Gagal update database");
      }

    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bold">Edit Program</h2>
        <button className="btn btn-secondary" onClick={() => router.back()}>Kembali</button>
      </div>
      
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="fw-bold">Nama</label>
            <input className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>
          <div className="col-12">
            <label className="fw-bold">Deskripsi</label>
            <textarea className="form-control" rows={4} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
          </div>

          {/* EDIT THUMBNAIL */}
          <div className="col-12">
            <label className="fw-bold text-primary">Thumbnail Utama</label>
            <div className="d-flex align-items-end gap-3">
              <img 
                src={newThumbnailFile ? previewThumbnail : (oldThumbnailUrl || "/images/default.jpg")} 
                className="rounded border" 
                style={{ width: "120px", height: "80px", objectFit: "cover" }} 
              />
              <input type="file" className="form-control" onChange={handleNewThumbnail} />
            </div>
          </div>

          {/* EDIT GALERI */}
          <div className="col-12 mt-4">
            <label className="fw-bold text-success">Galeri Dokumentasi</label>
            <input type="file" className="form-control mb-3" multiple onChange={handleNewGallery} />
            
            <div className="d-flex flex-wrap gap-2 bg-light p-3 rounded">
              {/* Tampilkan Gambar Lama (Database) */}
              {existingGallery.map((url, idx) => (
                <div key={`old-${idx}`} className="position-relative">
                  <img src={url} className="rounded border" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  <span className="badge bg-secondary position-absolute bottom-0 start-0" style={{fontSize: '10px'}}>Lama</span>
                  <button type="button" onClick={() => removeExistingGallery(idx)} className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0 px-1">&times;</button>
                </div>
              ))}

              {/* Tampilkan Gambar Baru (Preview) */}
              {newGalleryPreviews.map((url, idx) => (
                <div key={`new-${idx}`} className="position-relative">
                  <img src={url} className="rounded border border-success" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  <span className="badge bg-success position-absolute bottom-0 start-0" style={{fontSize: '10px'}}>Baru</span>
                  <button type="button" onClick={() => removeNewGallery(idx)} className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0 px-1">&times;</button>
                </div>
              ))}
            </div>
            <small className="text-muted">Klik tombol X merah untuk menghapus gambar.</small>
          </div>

          <div className="col-12 mt-4">
            <button className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Menyimpan Perubahan..." : "Update Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}