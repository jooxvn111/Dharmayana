// src/app/contact/page.tsx
"use client";

import { Container, Row, Col, Image } from 'react-bootstrap';
// Kita masih pakai react-icons
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <Container className="py-5">
      
      {/* --- Header --- */}
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead" style={{ color: '#f8f9fa' }}>
            Jika ada pertanyaan, jangan ragu untuk menghubungi kami melalui informasi di bawah ini.
          </p>
        </Col>
      </Row>

      {/* --- Kotak Konten (Background Terang) --- */}
      {/* Ini adalah div yang membuat kotak putih/terang seperti di desain */}
      <div className="bg-light p-4 p-md-5 rounded text-dark shadow-sm">
        <Row className="align-items-center">
          
          {/* --- Kolom Kiri: Gambar --- */}
          <Col md={6} className="mb-4 mb-md-0">
            <Image 
              src="/images/contact.jpeg" // <-- NAMA FILE ANDA
              alt="Kontak Dharmayana"
              fluid 
              rounded 
              className="shadow-sm"
            />
          </Col>

          {/* --- Kolom Kanan: Info --- */}
          <Col md={6} className="ps-md-4">
            
            {/* Alamat Kami */}
            <h5 className="fw-bold mb-3">Alamat Kami</h5>
            <div className="d-flex mb-4">
              <FaMapMarkerAlt size={30} className="me-3 flex-shrink-0" />
              <div>
                <strong>Sekretariat Dharmayana</strong>
                <br />
                Jl. Letjen S. Parman No.1, Kampus 1 Universitas Tarumanagara
                <br />
                Gedung M, Lantai 2, Grogol Petamburan, Jakarta Barat 11440
              </div>
            </div>

            {/* Informasi Kontak */}
            <h5 className="fw-bold mb-3">Informasi Kontak</h5>
            <Row>
              {/* Email */}
              <Col md={12} lg={6} className="mb-3 mb-lg-0">
                <div className="d-flex">
                  <FaEnvelope size={20} className="me-3 flex-shrink-0" />
                  <div>
                    <strong>Email Kami</strong>
                    <br />
                    {/* Kita buat jadi link agar bisa diklik */}
                    <a href="mailto:dharmayana_untar@yahoo.com" className="text-dark text-decoration-none">
                      dharmayana_untar@yahoo.com
                    </a>
                  </div>
                </div>
              </Col>
              {/* Telepon */}
              <Col md={12} lg={6}>
                <div className="d-flex">
                  <FaPhone size={20} className="me-3 flex-shrink-0" />
                  <div>
                    <strong>Telepon Kami</strong>
                    <br />
                    +62 895 1838 1145
                  </div>
                </div>
              </Col>
            </Row>
            
          </Col>
        </Row>
      </div>
      
    </Container>
  );
}