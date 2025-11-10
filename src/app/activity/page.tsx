// src/app/activity/page.tsx
"use client";

// 1. IMPORT useState dan Modal
import { useState } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';

export default function ActivityPage() {
  
  // 2. BUAT STATE UNTUK MENGONTROL MODAL
  // Nilainya bisa null (tutup), 'dwp', 'kathina', atau 'dd'
  const [showModal, setShowModal] = useState(null);

  // Fungsi untuk menutup modal
  const handleClose = () => setShowModal(null);

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

      {/* --- Kegiatan 1: DWP --- */}
      <Row className="align-items-center mb-4 bg-light p-4 rounded text-dark">
        <Col md={6}>
          <Image 
            src="/images/dwp.jpeg"
            alt="Welcoming Party"
            fluid 
            rounded 
            className="shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">Dharmayana Welcoming Party</h2>
          <p>
            Dharmayana Welcoming Party adalah program kerja yang diadakan setiap awal periode...
          </p>
          {/* 3. TAMBAHKAN onClick UNTUK MEMBUKA MODAL 'dwp' */}
          <Button variant="dark" onClick={() => setShowModal('dwp')}>
            Lihat Galeri
          </Button>
        </Col>
      </Row>
      
      {/* --- Kegiatan 2: Kathina --- */}
      <Row className="align-items-center mb-4 bg-light p-4 rounded text-dark">
        <Col md={6} className="order-md-2"> 
          <Image 
            src="/images/kathina.jpeg" 
            alt="Kathina"
            fluid 
            rounded 
            className="shadow-sm"
          />
        </Col>
        <Col md={6} className="order-md-1"> 
          <h2 className="fw-bold">Pindapata dan Sangha Dana</h2>
          <p>
            Kathina adalah Program Kerja Dharmayana yang dilaksanakan untuk memperingati...
          </p>
          {/* 3. TAMBAHKAN onClick UNTUK MEMBUKA MODAL 'kathina' */}
          <Button variant="dark" onClick={() => setShowModal('kathina')}>
            Lihat Galeri
          </Button>
        </Col>
      </Row>
      
      {/* --- Kegiatan 3: Darmadhista --- */}
      <Row className="align-items-center mb-4 bg-light p-4 rounded text-dark">
        <Col md={6}>
          <Image 
            src="/images/dd.jpeg" 
            alt="Darmadhista"
            fluid 
            rounded 
            className="shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">Darmadhista</h2>
          <p>
            Darmadhista adalah program kerja Dharmayana yang diadakan setiap tahunnya...
          </p>
          {/* 3. TAMBAHKAN onClick UNTUK MEMBUKA MODAL 'dd' */}
          <Button variant="dark" onClick={() => setShowModal('dd')}>
            Lihat Galeri
          </Button>
        </Col>
      </Row>

      {/* ====================================================== */}
      {/* 4. DEFINISI SEMUA MODAL GALERI                         */}
      {/* ====================================================== */}

      {/* --- Modal Galeri DWP --- */}
      <Modal show={showModal === 'dwp'} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Galeri: Dharmayana Welcoming Party</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* === NAMA FILE SUDAH DIPERBAIKI === */}
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-dwp/baby.jpg" alt="Galeri DWP 1" fluid rounded />
              </Col>
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-dwp/image.png" alt="Galeri DWP 2" fluid rounded />
              </Col>
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-dwp/rokok.jpg" alt="Galeri DWP 3" fluid rounded />
              </Col>
              {/* Tambahkan <Col> lainnya jika Anda menambah foto baru... */}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      {/* --- Modal Galeri Kathina --- */}
      <Modal show={showModal === 'kathina'} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Galeri: Pindapata dan Sangha Dana</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* === NAMA FILE SUDAH DIPERBAIKI === */}
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-kathina/kucing.jpg" alt="Galeri Kathina 1" fluid rounded />
              </Col>
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-kathina/oo.jpg" alt="Galeri Kathina 2" fluid rounded />
              </Col>
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-kathina/sad.jpg" alt="Galeri Kathina 3" fluid rounded />
              </Col>
              {/* Tambahkan <Col> lainnya... */}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      {/* --- Modal Galeri Darmadhista --- */}
      <Modal show={showModal === 'dd'} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Galeri: Darmadhista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* === NAMA FILE SUDAH DIPERBAIKI === */}
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-dd/burung.jpg" alt="Galeri DD 1" fluid rounded />
              </Col>
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-dd/bwa.jpg" alt="Galeri DD 2" fluid rounded />
              </Col>
              <Col xs={6} md={4} className="mb-3">
                <Image src="/images/gallery-dd/cachedImage.png" alt="Galeri DD 3" fluid rounded />
              </Col>
              {/* Tambahkan <Col> lainnya... */}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

    </Container>
  );
}