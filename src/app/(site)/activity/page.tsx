"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale"; // Bahasa Indonesia
import "react-calendar/dist/Calendar.css"; // CSS Wajib untuk Kalender

// Tipe data sesuai database
type Program = {
  _id: string;
  nama: string;
  tanggal: string; // Tanggal acara disimpan sebagai string ISO
  deskripsi: string;
  gambar: string;
};

export default function ActivityPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [date, setDate] = useState<any>(new Date()); // Tanggal yang dipilih user
  const [selectedEvents, setSelectedEvents] = useState<Program[]>([]); // Event pada tanggal tersebut

  // 1. Ambil data dari API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/program");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPrograms(data);
        }
      } catch (err) {
        console.error("Gagal mengambil data program:", err);
      }
    }
    fetchData();
  }, []);

  // 2. Filter event saat tanggal berubah
  useEffect(() => {
    if (programs.length > 0) {
      const events = programs.filter((p) => {
        if (!p.tanggal) return false;
        return isSameDay(new Date(p.tanggal), date);
      });
      setSelectedEvents(events);
    }
  }, [date, programs]);

  // 3. Menandai tanggal yang ada event-nya (Titik Merah)
  const tileContent = ({ date, view }: any) => {
    if (view === "month") {
      const hasEvent = programs.some((p) => p.tanggal && isSameDay(new Date(p.tanggal), date));
      if (hasEvent) {
        return (
          <div className="d-flex justify-content-center">
            <div style={{
              height: "6px",
              width: "6px",
              backgroundColor: "#dc3545",
              borderRadius: "50%",
              marginTop: "2px"
            }}></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="container py-5">
      {/* JUDUL */}
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#8B0000" }}>Kalender Kegiatan Dharmayana</h1>
        <p className="text-muted">Cek jadwal kegiatan kami di bawah ini</p>
      </div>

      <div className="row g-5">
        {/* === KIRI: KALENDER === */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-3">
            <style jsx global>{`
              /* Styling Custom Kalender */
              .react-calendar { width: 100%; border: none; font-family: sans-serif; }
              .react-calendar__navigation button { font-size: 1.2rem; font-weight: bold; }
              .react-calendar__tile--now { background: #fff3cd !important; color: #856404; }
              .react-calendar__tile--active { background: #8B0000 !important; color: white !important; }
              .react-calendar__month-view__days__day--weekend { color: #d9534f; }
            `}</style>

            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              locale="id-ID"
            />
          </div>
          <p className="text-center mt-3 small text-muted">
            <span className="text-danger fw-bold">•</span> Titik merah menandakan ada kegiatan.
          </p>
        </div>

        {/* === KANAN: LIST KEGIATAN === */}
        <div className="col-lg-7">
          <div className="h-100 p-4 bg-light rounded shadow-sm">
            <h4 className="fw-bold mb-4 pb-2 border-bottom">
              Kegiatan Tanggal: <span className="text-danger">{format(date, "d MMMM yyyy", { locale: id })}</span>
            </h4>

            {selectedEvents.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {selectedEvents.map((item) => (
                  <div key={item._id} className="card border-0 shadow-sm overflow-hidden">
                    <div className="row g-0 align-items-center">
                      {/* Gambar Thumbnail */}
                      <div className="col-4 col-sm-3">
                        <img
                          src={item.gambar || "https://via.placeholder.com/150"}
                          alt={item.nama}
                          className="img-fluid h-100"
                          style={{ objectFit: "cover", minHeight: "100px", width: "100%" }}
                        />
                      </div>
                      {/* Teks Deskripsi */}
                      <div className="col-8 col-sm-9">
                        <div className="card-body py-2">
                          <h5 className="card-title fw-bold mb-1">{item.nama}</h5>
                          <p className="card-text text-muted small mb-0">
                            {item.deskripsi.substring(0, 80)}...
                          </p>
                          <small className="text-danger fw-bold">
                            {format(new Date(item.tanggal), "EEEE, d MMMM yyyy", { locale: id })}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <h5 className="text-muted">Tidak ada kegiatan di tanggal ini.</h5>
                <p className="small text-secondary">Silakan pilih tanggal lain di kalender.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}