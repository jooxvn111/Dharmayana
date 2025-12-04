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

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMsg(data.msg);
  }

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "380px", borderRadius: "18px" }}
      >
        <h3 className="text-center mb-4 fw-bold">Register</h3>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-semibold">Username</label>
            <input
              className="form-control"
              value={username}
              placeholder="Buat username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Buat password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 py-2 mt-2 fw-semibold">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Sudah punya akun?
          <Link
            href="/login"
            className="ms-1 text-primary fw-semibold"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
