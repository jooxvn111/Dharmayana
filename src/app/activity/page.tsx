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
            Dharmayana Welcoming Party adalah program kerja yang diadakan setiap awal periode. Tujuan dari diadakannya Program Kerja ini adalah untuk menarik mahasiswa baru yang beragama buddhist dengan mengenalkan mereka KMB Dharmayana dalam lingkungan kampus dan berbagai proker juga kepengurusan yang ada  
          </p>
          <Button variant="dark">Lihat Galeri</Button>
        </Col>
      </Row>
      
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
            Kathina adalah Program Kerja Dharmayana yang dilaksanakan untuk memperingati salah satu hari besar agama Buddhist yaitu Hari Kathina. 
            Hari Kathina merupakan hari dimana para bhikkhu menerima kain baru dari umat Buddha setelah menyelesaikan masa Vassa (retret musim hujan) selama tiga bulan.  
          </p>
          <Button variant="dark">Lihat Galeri</Button>
        </Col>
      </Row>
      
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
            Darmadhista adalah program kerja Dharmayana yang diadakan setiap tahunnya sebagai ajang kompetisi seni dan budaya buddhis antar mahasiswa buddhis di Indonesia. 
            Acara ini bertujuan untuk mempererat tali persaudaraan antar mahasiswa buddhis serta melestarikan seni dan budaya buddhis di kalangan generasi muda.
            Biasanya acara ini diadakan selama dua hari dengan berbagai rangkaian kegiatan seperti games, pelatihan sila dan kompetisi antar kelompok.
          </p>
          <Button variant="dark">Lihat Galeri</Button>
        </Col>
      </Row>

    </Container>
  );
}