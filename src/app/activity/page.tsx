// src/app/activity/page.tsx
"use client";

import { Container, Row, Col, Image, Button } from 'react-bootstrap';

export default function ActivityPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="display-4 fw-bold">Kegiatan Dharmayana</h1>
          <p className="lead" style={{ color: '#f8f9fa' }}>
            Lihat semua program kerja dan kegiatan yang telah kami lakukan.
          </p>
        </Col>
      </Row>

      {/* --- Kegiatan 1 (Gambar Kiri) --- */}
      {/* Kita beri background terang agar kontras & mudah dibaca */}
      <Row className="align-items-center mb-4 bg-light p-4 rounded text-dark">
        <Col md={6}>
          <Image 
            src="/images/dwp.jpeg" // Ganti dengan gambar kegiatan
            alt="Welcoming Party"
            fluid 
            rounded 
            className="shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">Dharmayana Welcoming Party</h2>
          <p>
            (Teman Anda bisa mengisi deskripsi lengkap di sini...)
            program kerja yang bertujuan menyambut mahasiswa baru Buddhis Universitas Tarumanagara.
          </p>
          <Button variant="dark">Lihat Galeri</Button>
        </Col>
      </Row>
      
      {/* --- Kegiatan 2 (Gambar Kanan) --- */}
      <Row className="align-items-center mb-4 bg-light p-4 rounded text-dark">
        <Col md={6} className="order-md-2"> {/* order-md-2 memindah gambar ke kanan di layar besar */}
          <Image 
            src="/images/kathina.jpeg" // Ganti dengan gambar kegiatan
            alt="Kathina"
            fluid 
            rounded 
            className="shadow-sm"
          />
        </Col>
        <Col md={6} className="order-md-1"> {/* order-md-1 memindah teks ke kiri */}
          <h2 className="fw-bold">Pindapata dan Sangha Dana</h2>
          <p>
            (Teman Anda bisa mengisi deskripsi lengkap di sini...)
            program kerja yang dilaksanakan untuk memperingati salah satu hari besar agama Buddha, yaitu Hari Suci Kathina.
          </p>
          <Button variant="dark">Lihat Galeri</Button>
        </Col>
      </Row>
      
      {/* --- Kegiatan 3 (Gambar Kiri) --- */}
      <Row className="align-items-center mb-4 bg-light p-4 rounded text-dark">
        <Col md={6}>
          <Image 
            src="/images/dd.jpeg" // Ganti dengan gambar kegiatan
            alt="Darmadhista"
            fluid 
            rounded 
            className="shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">Darmadhista</h2>
          <p>
            (Teman Anda bisa mengisi deskripsi lengkap di sini...)
            program kerja yang bertujuan untuk membina hubungan antara mahasiswa baru Buddhis yang menjadi anggota Dharmayana.
          </p>
          <Button variant="dark">Lihat Galeri</Button>
        </Col>
      </Row>

      {/* Teman Anda bisa duplikat <Row> di atas untuk kegiatan lainnya */}

    </Container>
  );
}