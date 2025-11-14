"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          background: "#1e1e2f",
          color: "white",
          padding: "20px",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Admin Panel</h3>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li style={{ marginBottom: "12px" }}>
            <Link href="/admin" style={{ color: "white", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>

          <li style={{ marginBottom: "12px" }}>
            <Link href="/admin/program" style={{ color: "white", textDecoration: "none" }}>
              Data Program
            </Link>
          </li>

          <li style={{ marginBottom: "12px" }}>
            <Link href="/admin/galeri" style={{ color: "white", textDecoration: "none" }}>
              Galeri
            </Link>
          </li>

          <li style={{ marginBottom: "12px" }}>
            <Link href="/admin/pengaturan" style={{ color: "white", textDecoration: "none" }}>
              Pengaturan
            </Link>
          </li>

          <li style={{ marginTop: "40px" }}>
            <button onClick={handleLogout} className="btn btn-danger w-100">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* HALAMAN KONTEN */}
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
}
