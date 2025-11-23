"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProgramTambahPage() {
  const router = useRouter();

  // State Data Text
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  // State Thumbnail Utama (Single)
  const [gambar, setGambar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // State Galeri (Multiple)
  const [filesGaleri, setFilesGaleri] = useState<File[]>([]);
  const [previewsGaleri, setPreviewsGaleri] = useState<string[]>([]);

  // State Loading agar tombol tidak dipencet 2x
  const [isUploading, setIsUploading] = useState(false);

  // 1. Handle Gambar Utama
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 2. Handle Gambar Galeri (Bisa pilih banyak)
  const handleGalleryImages = (e: any) => {
    const selectedFiles = Array.from(e.target.files) as File[];
    
    // Gabungkan file lama (jika user upload bertahap) dengan file baru
    setFilesGaleri((prev) => [...prev, ...selectedFiles]);

    // Buat URL preview untuk file baru
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewsGaleri((prev) => [...prev, ...newPreviews]);
  };

  // 3. Hapus Salah Satu Gambar Galeri (Sebelum Upload)
  const removeGalleryImage = (index: number) => {
    setFilesGaleri((prev) => prev.filter((_, i) => i !== index));
    setPreviewsGaleri((prev) => prev.filter((_, i) => i !== index));
  };

  // 4. Fungsi Helper Upload ke API
  async function uploadFileToApi(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Gagal upload gambar");
    const data = await res.json();
    return data.url; // Pastikan API mengembalikan { url: "..." }
  }

  // 5. SUBMIT FORM
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsUploading(true); // Matikan tombol submit

    try {
      // A. Upload Thumbnail Utama (Wajib)
      let mainImageUrl = "";
      if (gambar) {
        mainImageUrl = await uploadFileToApi(gambar);
      } else {
        toast.error("Harap pilih gambar utama (Thumbnail)!");
        setIsUploading(false);
        return;
      }

      // B. Upload Galeri (Looping satu per satu)
      const galleryUrls = [];
      if (filesGaleri.length > 0) {
        for (const file of filesGaleri) {
          const url = await uploadFileToApi(file);
          galleryUrls.push(url);
        }
      }

      // C. Simpan ke Database
      const payload = {
        nama,
        deskripsi,
        gambar: mainImageUrl, // URL Thumbnail
        galeri: galleryUrls   // Array URL Galeri
      };

      const resProgram = await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resProgram.ok) {
        toast.success("Program berhasil ditambahkan!");
        setTimeout(() => router.push("/admin/program"), 1500);
      } else {
        toast.error("Gagal menyimpan data program!");
      }

    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat upload!");
    } finally {
      setIsUploading(false); // Nyalakan tombol lagi (jika error)
    }
  }

  return (
    <div className="container py-4">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Tambah Program Kerja</h2>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          Kembali
        </button>
      </div>

      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit} className="row g-3">

          {/* Nama Program */}
          <div className="col-md-12">
            <label className="form-label fw-bold">Nama Program</label>
            <input
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Masukkan nama program kerja"
            />
          </div>

          {/* Deskripsi */}
          <div className="col-md-12">
            <label className="form-label fw-bold">Deskripsi Program</label>
            <textarea
              className="form-control"
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              placeholder="Masukkan deskripsi program"
            ></textarea>
          </div>

          {/* --- INPUT 1: GAMBAR UTAMA (THUMBNAIL) --- */}
          <div className="col-md-12">
            <label className="form-label fw-bold text-primary">Gambar Utama (Thumbnail)</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImage} required />

            {preview && (
              <div className="mt-3">
                <p className="small text-muted mb-1">Preview Thumbnail:</p>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "200px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </div>

          {/* --- INPUT 2: GALERI (MULTIPLE) --- */}
          <div className="col-md-12 mt-3">
            <label className="form-label fw-bold text-success">Galeri Dokumentasi (Opsional)</label>
            <p className="small text-muted mb-1">Anda bisa memilih banyak foto sekaligus.</p>
            
            <input 
              type="file" 
              className="form-control" 
              accept="image/*" 
              multiple // <--- PENTING: Agar bisa pilih banyak file
              onChange={handleGalleryImages} 
            />

            {/* Area Preview Galeri */}
            {previewsGaleri.length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-3">
                {previewsGaleri.map((src, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={src}
                      alt={`Galeri ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #eee",
                      }}
                    />
                    {/* Tombol Hapus Kecil (X Merah) */}
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 d-flex align-items-center justify-content-center"
                      style={{ width: "24px", height: "24px", borderRadius: "50%", transform: "translate(30%, -30%)" }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tombol Submit */}
          <div className="col-md-12 mt-4">
            <button className="btn btn-primary px-4 py-2 w-100" disabled={isUploading}>
              {isUploading ? (
                <span><span className="spinner-border spinner-border-sm me-2"></span>Mengupload...</span>
              ) : (
                "Simpan Program"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}