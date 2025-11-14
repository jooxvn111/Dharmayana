"use client";

export default function AdminProgramHome() {
  return (
    <div className="container mt-4">

      <div className="p-4 bg-primary text-white rounded mb-4">
        <h2 className="mb-0">Selamat Datang di Panel Admin</h2>
        <p className="mb-0">Kelola Program Kerja dengan mudah</p>
      </div>

      <div className="row g-3">

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Tambah Program</h5>
              <p className="card-text text-muted">
                Tambahkan program kerja baru ke sistem.
              </p>
              <a href="/admin/program/tambah" className="btn btn-primary w-100">
                + Tambah Program
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Lihat Daftar Program</h5>
              <p className="card-text text-muted">
                Melihat semua program kerja yang sudah dibuat.
              </p>
              <a href="/program" className="btn btn-outline-primary w-100">
                Lihat Program
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pengaturan Admin</h5>
              <p className="card-text text-muted">
                Konfigurasi halaman dan informasi lainnya.
              </p>
              <button className="btn btn-outline-secondary w-100">
                Pengaturan
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
