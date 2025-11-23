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
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#8B0000" }}>Kalender Kegiatan Dharmayana</h1>
        <p className="text-muted">Cek jadwal kegiatan kami di bawah ini</p>
      </div>

      <div className="row g-5">
        {/* KALENDER */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-3">
            <style jsx global>{`
              .react-calendar { width: 100%; border: none; font-family: sans-serif; }
              .react-calendar__navigation button { font-size: 1.2rem; font-weight: bold; }
              .react-calendar__tile--now { background: #fff3cd !important; color: #856404; }
              .react-calendar__tile--active { background: #8B0000 !important; color: white !important; }
            `}</style>
            <Calendar onChange={setDate} value={date} tileContent={tileContent} locale="id-ID" />
          </div>
          <p className="text-center mt-3 small text-muted">
            <span className="text-danger fw-bold">•</span> Titik merah menandakan ada kegiatan.
          </p>
        </div>

        {/* LIST EVENT */}
        <div className="col-lg-7">
          <div className="h-100 p-4 bg-white rounded shadow-sm">
            <h4 className="fw-bold mb-4 pb-2 border-bottom">
              Kegiatan Tanggal: <span className="text-danger">{format(date, "d MMMM yyyy", { locale: id })}</span>
            </h4>

            {selectedEvents.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {selectedEvents.map((item) => (
                  <div key={item._id} className="card border-0 shadow-sm overflow-hidden">
                    <div className="row g-0 align-items-center">
                      <div className="col-4 col-sm-3">
                        <img
                          src={item.gambar || "/images/placeholder.jpg"}
                          alt={item.nama}
                          className="img-fluid h-100"
                          style={{ objectFit: "cover", minHeight: "100px", width: "100%" }}
                        />
                      </div>
                      <div className="col-8 col-sm-9">
                        <div className="card-body py-2">
                          <h5 className="card-title fw-bold mb-1">{item.nama}</h5>
                          <p className="card-text text-muted small mb-0">
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
                <h5 className="text-muted">Tidak ada kegiatan di tanggal ini.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* TIDAK ADA KODE FOOTER DISINI */}
      {/* Footer akan otomatis muncul dari Layout.tsx */}
    </div>
  );
}