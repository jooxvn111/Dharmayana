"use client";

import { useState } from "react";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setMsg(data.msg || "Terjadi kesalahan");
    } catch (error) {
      setMsg("Gagal menghubungi server");
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #ffe9c4, #fff8ee)", // Background gradasi sama dengan Login
      }}
    >
      <div
        className="shadow p-4 bg-white"
        style={{
          width: "380px",
          borderRadius: "20px", // Style kartu melengkung
        }}
      >
        <h3 className="text-center mb-3 fw-bold text-dark">Register</h3>
        <p className="text-center text-muted mb-4">
          Buat akun admin baru
        </p>

        {msg && (
          <div
            className={`alert ${msg.toLowerCase().includes('berhasil') ? 'alert-success' : 'alert-danger'} text-center py-2`}
            style={{ borderRadius: "10px" }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-semibold">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Buat username"
              style={{
                borderRadius: "10px",
                padding: "10px",
                borderColor: "#ddd",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat password"
              style={{
                borderRadius: "10px",
                padding: "10px",
                borderColor: "#ddd",
              }}
            />
          </div>

          <button
            className="btn w-100 py-2 fw-semibold mt-2"
            style={{
              background: "#ffb347", // Warna oranye Login
              borderRadius: "10px",
              border: "none",
              color: "white",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#ff9f1c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#ffb347")
            }
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Sudah punya akun?
          <Link
            href="/login"
            className="ms-1 fw-semibold"
            style={{ textDecoration: "none", color: "#d67a00" }} // Warna link oranye gelap
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}