"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Home() {
  const [program, setProgram] = useState<any[]>([]);

  async function loadProgram() {
    try {
      const res = await fetch("/api/program");
      const data = await res.json();

      // pastikan datanya array
      if (Array.isArray(data)) {
        setProgram(data);
      } else {
        console.error("API /api/program tidak mengembalikan array:", data);
        setProgram([]);
      }
    } catch (err) {
      console.error("Gagal fetch program:", err);
      setProgram([]);
    }
  }

  useEffect(() => {
    loadProgram();
  }, []);

  return (
    <>
      {/* === HERO SECTION === */}
      <Container className="bg-light text-dark p-4 p-md-5 rounded shadow-sm mt-4 mb-4">
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <h1 className="display-4 fw-bold">Welcome to Dharmayana!</h1>
            <p className="lead text-muted">
              KMB Dharmayana Untar adalah sebuah wadah organisasi keagamaan Buddhis di Universitas Tarumanagara.
            </p>
            <Image src="/images/untar.png" alt="Powered by" style={{ height: "40px" }} />
          </Col>

          <Col md={6} className="mt-4 mt-md-0">
            <Image
              src="/images/contact.jpeg"
              alt="Grup Dharmayana"
              fluid
              rounded
              className="shadow-sm"
            />
          </Col>
        </Row>
      </Container>

      {/* === PROGRAM KERJA DINAMIS === */}
      <Container className="py-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">Kegiatan Dharmayana</h2>
            <p>Program kerja Dharmayana yang diperbarui oleh admin dan tampil otomatis.</p>
          </Col>
        </Row>

        <h4 className="fw-bold mb-3">Program Kerja</h4>

        <Row className="mb-4">
          {Array.isArray(program) && program.length > 0 ? (
            program.map((item) => (
              <Col md={4} className="mb-3" key={item._id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={item.gambar || "/images/default.jpg"}
                    alt={item.nama}
                  />
                  <Card.Body>
                    <Card.Title>{item.nama}</Card.Title>
                    <Card.Text className="small text-muted">
                      {item.deskripsi}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-muted">Belum ada program kerja ditambahkan.</p>
          )}
        </Row>
      </Container>

      {/* === SECTION LAIN (FAQ + SPONSOR + FOOTER) === */}
      <Container className="bg-light text-dark p-4 p-md-5 rounded shadow-sm mb-4">
        {/* ... isi FAQ & sponsor kamu ... */}

        <hr />

        <div className="text-center text-muted pt-3">
          <h5 className="fw-bold text-dark">KMB Dharmayana Untar</h5>
          <p className="small">© 2024 Dharmayana. All rights reserved.</p>

          <div className="mb-3">
            <a href="#!" className="text-dark me-3">
              <FaInstagram size={20} />
            </a>
            <a href="#!" className="text-dark">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
