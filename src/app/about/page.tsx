// src/app/about/page.tsx
"use client";

import { Container, Row, Col, Image } from 'react-bootstrap';
// Import ikon-ikon yang kita butuhkan
import { FaHeart, FaUsers, FaBook, FaHandHoldingHeart, FaLeaf, FaHandsHelping, FaUniversity } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <>
      {/* --- Section Keluarga Mahasiswa --- */}
      {/* Anda bisa pakai class bg-beige dari custom.css jika ingin background-nya krem */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={5} className="text-center">
            <Image 
              src="/images/bd71.jpeg" // Ambil dari halaman home
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

      {/* --- Section Visi --- */}
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
          {/* Poin Visi 1 */}
          <Col md={4} className="mb-3 d-flex">
            <FaBook size={30} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold">Buddha Dharma</h5>
              <p className="text-muted">Menghayati, mengamalkan, dan melaksanakan Buddha Dharma.</p>
            </div>
          </Col>
          {/* Poin Visi 2 */}
          <Col md={4} className="mb-3 d-flex">
            <FaUsers size={30} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold">Keharmonisan Kerukunan Beragama</h5>
              <p className="text-muted">Meningkatkan kerukunan dan kesatuan beragama.</p>
            </div>
          </Col>
          {/* Poin Visi 3 */}
          <Col md={4} className="mb-3 d-flex">
            <FaUniversity size={30} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold">Tri Dharma Perguruan Tinggi</h5>
              <p className="text-muted">Menunjang dan menyukseskan Tri Dharma Perguruan Tinggi.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* --- Section Misi --- */}
      {/* Anda bisa tambahkan class bg-light atau bg-beige di sini */}
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
            {/* Poin Misi (buat jadi 5 poin) */}
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
            {/* Tambahkan poin ke-5 jika perlu */}
          </Row>
        </Container>
      </Container>

      {/* --- Section Our Team --- */}
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
          {/* Contoh 1 Anggota Tim */}
          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="/images/tim/juvinto.jpg" // Ganti dengan path foto tim Anda
              width={150}
              height={150}
              alt="Juvinto" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Juvinto</h6>
            <p className="text-muted small">Ketua Umum</p>
          </Col>
          {/* Contoh 2 Anggota Tim */}
          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="/images/tim/bernarda.jpg" // Ganti dengan path foto tim Anda
              width={150}
              height={150}
              alt="Bernarda Jati" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Bernarda Jati</h6>
            <p className="text-muted small">Koord. Bidang 1</p>
          </Col>
          
          {/* Duplikat <Col> di atas untuk anggota tim lainnya... */}
          
          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="/images/tim/amelia.jpg" // Ganti dengan path foto tim Anda
              width={150}
              height={150}
              alt="Amelia Aurora" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Amelia Aurora</h6>
            <p className="text-muted small">Koord. Bidang 2</p>
          </Col>
          <Col md={2} xs={6} className="mb-4">
            <Image 
              src="/images/tim/melinda.jpg" // Ganti dengan path foto tim Anda
              width={150}
              height={150}
              alt="Melinda Gloria" 
              className="rounded-circle shadow-sm mb-2"
            />
            <h6 className="fw-bold mb-0">Melinda Gloria</h6>
            <p className="text-muted small">Koord. Bidang 3</p>
          </Col>
        </Row>
        {/* Tambahkan <Row> baru untuk baris tim kedua */}
      </Container>
    </>
  );
}