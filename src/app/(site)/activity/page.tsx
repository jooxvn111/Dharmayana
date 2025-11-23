"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import "react-calendar/dist/Calendar.css"; 

type Program = {
  _id: string;
  nama: string;
  tanggal: string;
  deskripsi: string;
  gambar: string;
};

export default function ActivityPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [date, setDate] = useState<any>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<Program[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/program", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data)) {
          setPrograms(data);
        }
      } catch (err) {
        console.error("Gagal load data", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (programs.length > 0) {
      const events = programs.filter((p) => {
        if (!p.tanggal) return false;
        return isSameDay(new Date(p.tanggal), date);
      });
      setSelectedEvents(events);
    }
  }, [date, programs]);

  const tileContent = ({ date, view }: any) => {
    if (view === "month") {
      const hasEvent = programs.some((p) => p.tanggal && isSameDay(new Date(p.tanggal), date));
      if (hasEvent) {
        return (
          <div className="d-flex justify-content-center">
            <div style={{ height: "6px", width: "6px", backgroundColor: "#dc3545", borderRadius: "50%", marginTop: "2px" }}></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <>
      {/* === HEADER SECTION === */}
      <div 
        style={{ 
          backgroundColor: '#8B0000', 
          padding: '80px 0', 
          marginBottom: '50px',
          textAlign: 'center'
        }}
      >
        <div className="container">
          {/* PAKSA WARNA PUTIH DISINI */}
          <h1 className="fw-bold display-4" style={{ color: '#FFFFFF' }}>
            Kalender Kegiatan
          </h1>
          <p className="lead opacity-75" style={{ color: '#f0f0f0' }}>
            Jadwal kegiatan dan program kerja Dharmayana
          </p>
        </div>
      </div>

      {/* === KONTEN KALENDER === */}
      <div className="container pb-5">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm p-3 rounded-4">
              <style jsx global>{`
                .react-calendar { width: 100%; border: none; font-family: sans-serif; }
                .react-calendar__navigation button { font-size: 1.2rem; font-weight: bold; color: #8B0000; }
                .react-calendar__tile--now { background: #fff3cd !important; color: #856404; font-weight: bold; }
                .react-calendar__tile--active { background: #8B0000 !important; color: white !important; }
                .react-calendar__month-view__days__day--weekend { color: #d9534f; }
              `}</style>
              <Calendar onChange={setDate} value={date} tileContent={tileContent} locale="id-ID" />
            </div>
            <p className="text-center mt-3 small text-muted">
              <span className="text-danger fw-bold fs-5">•</span> Titik merah menandakan ada kegiatan.
            </p>
          </div>

          <div className="col-lg-7">
            <div className="h-100 p-4 bg-white rounded-4 shadow-sm border">
              <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: '#8B0000' }}>
                Kegiatan Tanggal: <span className="text-dark">{format(date, "d MMMM yyyy", { locale: id })}</span>
              </h4>

              {selectedEvents.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {selectedEvents.map((item) => (
                    <div key={item._id} className="card border-0 shadow-sm overflow-hidden bg-light">
                      <div className="row g-0 align-items-center">
                        <div className="col-3">
                          <img
                            src={item.gambar || "/images/placeholder.jpg"}
                            alt={item.nama}
                            className="w-100 h-100"
                            style={{ objectFit: "cover", minHeight: "100px" }}
                          />
                        </div>
                        <div className="col-9">
                          <div className="card-body py-2">
                            <h5 className="card-title fw-bold mb-1 text-danger">{item.nama}</h5>
                            <p className="card-text text-muted small mb-0 line-clamp-2">
                              {item.deskripsi.substring(0, 80)}...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="fs-1 text-muted mb-3">📅</div>
                  <h5 className="text-muted">Tidak ada kegiatan di tanggal ini.</h5>
                  <p className="small text-secondary">Silakan pilih tanggal lain yang bertanda merah.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}