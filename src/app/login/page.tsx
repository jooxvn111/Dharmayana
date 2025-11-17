"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#A78956", // warna sama dengan tema utama
        padding: "20px",
      }}
    >
      {/* CARD PUTIH */}
      <div
        className="shadow"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          borderRadius: "15px",
          padding: "35px",
        }}
      >
        <h2 className="fw-bold text-center mb-3">Login Admin</h2>
        <p className="text-center text-muted mb-4">
          Masukkan username dan password Anda
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "8px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ borderRadius: "8px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "600",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
