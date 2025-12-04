"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Carousel } from "react-bootstrap";
import NavbarComponent from "@/components/Navbar";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Home() {
  const [program, setProgram] = useState<any[]>([]);

  async function loadProgram() {
    try {
      const res = await fetch("http://localhost:5000/api/program");
      const data = await res.json();
      Array.isArray(data) ? setProgram(data) : setProgram([]);
    } catch {
      setProgram([]);
    }
  }

  useEffect(() => {
    loadProgram();
  }, []);

  return (
    <>
      <NavbarComponent />

      <Container className="rounded shadow-sm mt-4 mb-4 p-0 overflow-hidden">
        <Row className="g-0">
          <Col md={12}>
            <Carousel fade interval={3500} indicators={false}>
              <Carousel.Item>
                <div className="d-flex flex-column flex-md-row align-items-center bg-white p-4 p-md-5">
                  <div className="flex-grow-1">
                    <h1 className="fw-bold" style={{ color: "#222" }}>
                      Welcome to Dharmayana!
                    </h1>
                    <p className="text-muted" style={{ fontSize: "1.05rem" }}>
                      KMB Dharmayana Untar adalah wadah organisasi keagamaan Buddhis
                      di Universitas Tarumanagara.
                    </p>
                    <Image
                      src="/images/untar.png"
                      alt="UNTAR Logo"
                      style={{ height: 40 }}
                      className="opacity-75 mt-2"
                    />
                  </div>

                  <Image
                    src="/images/contact.jpeg"
                    alt="Dharmayana Group"
                    style={{
                      width: "380px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    className="shadow-sm mt-4 mt-md-0 ms-md-4"
                  />
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className="d-flex flex-column flex-md-row align-items-center bg-white p-4 p-md-5">
                  <div className="flex-grow-1">
                    <h1 className="fw-bold" style={{ color: "#222" }}>
                      Bersatu Dalam Dharma
                    </h1>
                    <p className="text-muted" style={{ fontSize: "1.05rem" }}>
                      Mengembangkan kebijaksanaan, welas asih, dan kebersamaan
                      melalui kegiatan positif.
                    </p>
                  </div>

                  <Image
                    src="/images/ppd.jpeg"
                    alt="Dharmayana Slide 2"
                    style={{
                      width: "380px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    className="shadow-sm mt-4 mt-md-0 ms-md-4"
                  />
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className="d-flex flex-column flex-md-row align-items-center bg-white p-4 p-md-5">
                  <div className="flex-grow-1">
                    <h1 className="fw-bold" style={{ color: "#222" }}>
                      Kegiatan & Pengabdian
                    </h1>
                    <p className="text-muted" style={{ fontSize: "1.05rem" }}>
                      Ikuti berbagai program Dharmayana yang menginspirasi dan
                      membangun.
                    </p>
                  </div>

                  <Image
                    src="/images/dwp.jpeg"
                    alt="Dharmayana Slide 3"
                    style={{
                      width: "380px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    className="shadow-sm mt-4 mt-md-0 ms-md-4"
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">Kegiatan Dharmayana</h2>
            <p className="text-muted">
              Program kerja Dharmayana yang diperbarui oleh admin dan tampil otomatis.
            </p>
          </Col>
        </Row>

        <h4 className="fw-bold mb-3">Program Kerja</h4>

        <Row className="mb-4">
          {program.length > 0 ? (
            program.map((item) => (
              <Col md={4} className="mb-3" key={item._id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={item.gambar || "/images/default.jpg"}
                    alt={item.nama}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.nama}</Card.Title>
                    <Card.Text className="small text-muted">{item.deskripsi}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-muted">Belum ada program kerja ditambahkan.</p>
          )}
        </Row>
      </Container>

      <Container className="bg-light text-dark p-4 p-md-5 rounded shadow-sm mb-4">
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
