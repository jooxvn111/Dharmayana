"use client";

import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
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
            Hubungi Kami
          </h1>
          <p className="lead opacity-75" style={{ color: '#f0f0f0' }}>
            Jika ada pertanyaan, jangan ragu untuk menghubungi kami melalui informasi di bawah ini.
          </p>
        </div>
      </div>

      {/* === KONTEN UTAMA === */}
      <Container className="mb-5">
        <div className="bg-light p-4 p-md-5 rounded text-dark shadow-sm">
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <Image 
                src="/images/contact.jpeg" 
                alt="Kontak Dharmayana"
                fluid 
                rounded 
                className="shadow-sm"
              />
            </Col>

            <Col md={6} className="ps-md-4">
              <h5 className="fw-bold mb-3 text-danger">Alamat Kami</h5>
              <div className="d-flex mb-4">
                <FaMapMarkerAlt size={30} className="me-3 flex-shrink-0 text-secondary" />
                <div>
                  <strong>Sekretariat Dharmayana</strong>
                  <br />
                  Jl. Letjen S. Parman No.1, Kampus 1 Universitas Tarumanagara
                  <br />
                  Gedung M, Lantai 2, Grogol Petamburan, Jakarta Barat 11440
                </div>
              </div>

              <h5 className="fw-bold mb-3 text-danger">Informasi Kontak</h5>
              <Row>
                <Col md={12} lg={6} className="mb-3 mb-lg-0">
                  <div className="d-flex">
                    <FaEnvelope size={20} className="me-3 flex-shrink-0 text-secondary" />
                    <div>
                      <strong>Email Kami</strong>
                      <br />
                      <a href="mailto:dharmayana_untar@yahoo.com" className="text-dark text-decoration-none">
                        dharmayana_untar@yahoo.com
                      </a>
                    </div>
                  </div>
                </Col>
                <Col md={12} lg={6}>
                  <div className="d-flex">
                    <FaPhone size={20} className="me-3 flex-shrink-0 text-secondary" />
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
    </>
  );
}