// src/app/about/page.tsx
"use client";

import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaHeart, FaUsers, FaBook, FaHandHoldingHeart, FaLeaf, FaHandsHelping, FaUniversity } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={5} className="text-center">
            <Image 
              src="/images/bd71.jpeg" 
              width={400}
              height={500}
              style={{ width: '80%', height: 'auto' }}
              alt="What you think" 
              className="rounded shadow"
            />
          </Col>
          <Col md={7}>
            <h1 className="display-5 fw-bold">Keluarga Mahasiswa Buddhis Dharmayana</h1>
            <p className="text-muted">
              Dharmayana Universitas Tarumanagara adalah sebuah wadah organisasi yang
              bersifat kekeluargaan dan keagamaan bagi seluruh umat Buddha
              di Universitas Tarumanagara... (lanjutkan deskripsi dari desain).
            </p>
            <ul className="list-unstyled text-muted">
              <li><FaLeaf className="me-2" /> Dharma – Kebenaran atau ajaran</li>
              <li><FaHeart className="me-2" /> Yana – Kendaraan atau kereta</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2 className="fw-bold">Our Vision</h2>
            <p className="lead text-muted">
              Dharmayana Universitas Tarumanagara bertujuan untuk:
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4} className="mb-3 d-flex">
            <FaBook size={30} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold">Buddha Dharma</h5>
              <p className="text-muted">Menghayati, mengamalkan, dan melaksanakan Buddha Dharma.</p>
            </div>
          </Col>
          <Col md={4} className="mb-3 d-flex">
            <FaUsers size={30} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold">Keharmonisan Kerukunan Beragama</h5>
              <p className="text-muted">Meningkatkan kerukunan dan kesatuan beragama.</p>
            </div>
          </Col>
          <Col md={4} className="mb-3 d-flex">
            <FaUniversity size={30} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold">Tri Dharma Perguruan Tinggi</h5>
              <p className="text-muted">Menunjang dan menyukseskan Tri Dharma Perguruan Tinggi.</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2 className="fw-bold">Our Mission</h2>
              <p className="lead text-muted">
                Untuk mencapai tujuannya, Dharmayana Universitas Tarumanagara berusaha antara lain:
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6} className="mb-3 d-flex">
              <FaBook size={30} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="fw-bold">Pemahaman dan Pengamalan Buddha Dharma</h5>
                <p className="text-muted">Deskripsi singkat misi...</p>
              </div>
            </Col>
            <Col md={6} className="mb-3 d-flex">
              <FaUsers size={30} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="fw-bold">Hubungan Persaudaraan yang Harmonis</h5>
                <p className="text-muted">Deskripsi singkat misi...</p>
              </div>
            </Col>
            <Col md={6} className="mb-3 d-flex">
              <FaHandHoldingHeart size={30} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="fw-bold">Hubungan dan Kerja Sama Berdasarkan Cinta Kasih</h5>
                <p className="text-muted">Deskripsi singkat misi...</p>
              </div>
            </Col>
            <Col md={6} className="mb-3 d-flex">
              <FaHandsHelping size={30} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="fw-bold">Kegiatan Sosial Keagamaan</h5>
                <p className="text-muted">Deskripsi singkat misi...</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2 className="fw-bold">Our Team</h2>
            <p className="lead text-muted">
              BPH Inti-Koordinator Dharmayana Untar
            </p>
          </Col>
        </Row>

        <Row className="text-center mt-4 justify-content-center">
          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="public\images\tan.png" 
              width={150}
              height={150}
              alt="Juvinto" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Tannia</h6>
            <p className="text-muted small">Ketua Umum</p>
          </Col>

          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="public\images\melin.png" 
              width={150}
              height={150}
              alt="metta" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Metta Anastasya</h6>
            <p className="text-muted small">Wakil Ketua Umum Dharmayana</p>
          </Col>
          
          
          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="public\images\melin.png" 
              width={150}
              height={150}
              alt="fio" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Fiorentine Ong</h6>
            <p className="text-muted small">Bendahara umum Dharmayana</p>
          </Col>

          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="public\images\ber.png" 
              width={150}
              height={150}
              alt="edric" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Edric Charly</h6>
            <p className="text-muted small">Sekretaris umum Dharmayana</p>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}