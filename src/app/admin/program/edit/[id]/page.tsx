"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // Unwrap params

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State Form
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  
  // State Thumbnail Utama
  const [gambarLama, setGambarLama] = useState("");
  const [gambarBaru, setGambarBaru] = useState<File | null>(null);
  const [previewBaru, setPreviewBaru] = useState("");

  // State Galeri (YANG HILANG KEMARIN)
  const [galeriLama, setGaleriLama] = useState<string[]>([]);
  const [filesGaleriBaru, setFilesGaleriBaru] = useState<File[]>([]);
  const [previewGaleriBaru, setPreviewGaleriBaru] = useState<string[]>([]);

  // 1. Load Data
  useEffect(() => {
    if (!id) return;
    async function loadData() {
      try {
        const res = await fetch(`/api/program/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        
        setNama(data.nama);
        setDeskripsi(data.deskripsi);
        setGambarLama(data.gambar);
        
        // Load Galeri Lama
        if (Array.isArray(data.galeri)) {
            setGaleriLama(data.galeri);
        }

        // Format Tanggal
        if (data.tanggal) {
          const dateObj = new Date(data.tanggal);
          const isoDate = dateObj.toISOString().split("T")[0];
          setTanggal(isoDate);
        }
      } catch (err) {
        toast.error("Gagal memuat data program");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  // Handle Gambar Utama
  const handleThumbnailChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambarBaru(file);
      setPreviewBaru(URL.createObjectURL(file));
    }
  };

  // Handle Tambah Galeri Baru
  const handleGalleryChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files) as File[];
    setFilesGaleriBaru((prev) => [...prev, ...selectedFiles]);
    
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewGaleriBaru((prev) => [...prev, ...newPreviews]);
  };

  // Hapus Gambar Galeri Lama (dari tampilan saja, belum database)
  const removeOldGallery = (index: number) => {
    setGaleriLama((prev) => prev.filter((_, i) => i !== index));
  };

  // Hapus Gambar Galeri Baru (yang belum diupload)
  const removeNewGallery = (index: number) => {
    setFilesGaleriBaru((prev) => prev.filter((_, i) => i !== index));
    setPreviewGaleriBaru((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload ke API
  async function uploadFileToApi(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Gagal upload gambar");
    const data = await res.json();
    return data.url;
  }

  // 2. Submit Update
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // A. Upload Thumbnail Baru (jika ada)
      let finalMainImage = gambarLama;
      if (gambarBaru) {
        finalMainImage = await uploadFileToApi(gambarBaru);
      }

      // B. Upload Galeri Baru (jika ada)
      const newGalleryUrls = [];
      for (const file of filesGaleriBaru) {
        const url = await uploadFileToApi(file);
        newGalleryUrls.push(url);
      }

      // Gabungkan Galeri Lama (yang tidak dihapus) + Galeri Baru
      const finalGallery = [...galeriLama, ...newGalleryUrls];

      // C. Kirim ke API Update
      const res = await fetch(`/api/program/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          tanggal,
          deskripsi,
          gambar: finalMainImage,
          galeri: finalGallery, // Kirim array galeri lengkap
        }),
      });

      if (res.ok) {
        toast.success("Program berhasil diupdate!");
        setTimeout(() => router.push("/admin/program"), 1500);
      } else {
        toast.error("Gagal mengupdate program");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="p-5 text-center">Memuat data...</div>;

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-secondary">Edit Program</h2>
        <button className="btn btn-secondary" onClick={() => router.back()}>Kembali</button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <form onSubmit={handleUpdate} className="row g-4">
            
            {/* Nama */}
            <div className="col-md-12">
              <label className="form-label fw-bold">Nama Program</label>
              <input className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>

            {/* Tanggal */}
            <div className="col-md-12">
              <label className="form-label fw-bold text-danger">Tanggal Kegiatan</label>
              <input type="date" className="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
            </div>

            {/* Deskripsi */}
            <div className="col-md-12">
              <label className="form-label fw-bold">Deskripsi</label>
              <textarea className="form-control" rows={5} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
            </div>

            {/* Gambar Utama */}
            <div className="col-md-12">
              <label className="form-label fw-bold text-primary">Thumbnail Utama</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleThumbnailChange} />
              <div className="mt-2">
                <img src={previewBaru || gambarLama || "/images/placeholder.jpg"} alt="Preview" className="rounded border" style={{ height: "120px" }} />
              </div>
            </div>

            {/* --- BAGIAN GALERI YANG HILANG (SUDAH KEMBALI) --- */}
            <div className="col-md-12 bg-light p-3 rounded">
                <label className="form-label fw-bold text-success">Galeri Dokumentasi</label>
                
                {/* 1. Tampilkan Galeri Lama */}
                <p className="small text-muted mb-1">Foto yang sudah ada (Klik X untuk hapus):</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {galeriLama.map((src, idx) => (
                        <div key={`old-${idx}`} className="position-relative">
                            <img src={src} className="rounded border" style={{ width: 80, height: 80, objectFit: "cover" }} />
                            <button type="button" onClick={() => removeOldGallery(idx)} className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0 px-1" style={{ borderRadius: "50%", transform: "translate(30%, -30%)" }}>&times;</button>
                        </div>
                    ))}
                    {galeriLama.length === 0 && <span className="text-muted small fst-italic">- Belum ada foto galeri -</span>}
                </div>

                {/* 2. Upload Galeri Baru */}
                <label className="form-label small fw-bold">Tambah Foto Baru:</label>
                <input type="file" className="form-control" multiple accept="image/*" onChange={handleGalleryChange} />
                
                {/* Preview Upload Baru */}
                <div className="d-flex flex-wrap gap-2 mt-2">
                    {previewGaleriBaru.map((src, idx) => (
                        <div key={`new-${idx}`} className="position-relative">
                            <img src={src} className="rounded border" style={{ width: 80, height: 80, objectFit: "cover", filter: "brightness(0.9)" }} />
                            <button type="button" onClick={() => removeNewGallery(idx)} className="btn btn-secondary btn-sm position-absolute top-0 end-0 py-0 px-1" style={{ borderRadius: "50%", transform: "translate(30%, -30%)" }}>&times;</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-12 mt-4">
              <button className="btn btn-primary w-100 py-3 fw-bold" disabled={submitting}>
                {submitting ? "Sedang Menyimpan..." : "Update Program"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}