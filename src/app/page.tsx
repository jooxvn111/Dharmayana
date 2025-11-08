// src/app/page.tsx
"use client";

import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
// Import icons untuk footer
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      {/* =====================================================
        KOTAK PUTIH 1: WELCOME
        =====================================================
      */}
      <Container className="bg-light text-dark p-4 p-md-5 rounded shadow-sm mt-4 mb-4">
        
        {/* --- Section Welcome (Desain Baru) --- */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <h1 className="display-4 fw-bold">Welcome to Dharmayana!</h1>
            <p className="lead text-muted">
              KMB Dharmayana Untar adalah sebuah wadah organisasi yang
              bersifat kekeluargaan dan keagamaan bagi seluruh umat Buddha
              di Universitas Tarumanagara.
            </p>
            <Image src="/images/untar.png" alt="Powered by" style={{ height: '40px' }} />
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


      {/* =====================================================
        BAGIAN COKELAT: KEGIATAN
        =====================================================
      */}
      <Container className="py-5">
        
        {/* --- Judul Kegiatan --- */}
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">Kegiatan Dharmayana</h2>
            <p>Beragam kegiatan Dharmayana untuk mempererat kebersamaan, dan semangat Dharma.</p>
          </Col>
        </Row>
        
        {/* --- Row 1: Program Kerja --- */}
        <h4 className="fw-bold mb-3">Program Kerja</h4>
        <Row className="mb-4">
          {/* Card 1 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/dwp.jpeg" alt="DWP" />
              <Card.Body>
                <Card.Title>Dharmayana's Welcoming Party</Card.Title>
                <Card.Text className="small text-muted">
                  program kerja yang bertujuan menyambut mahasiswa baru Buddhis...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 2 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/dd.jpeg" alt="Darmadhista" />
              <Card.Body>
                <Card.Title>Darmadhista</Card.Title>
                <Card.Text className="small text-muted">
                  program kerja yang bertujuan untuk membina hubungan...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 3 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/kathina.jpeg" alt="Pindapata" />
              <Card.Body>
                <Card.Title>Pindapata dan Sangha Dana</Card.Title>
                <Card.Text className="small text-muted">
                  program kerja yang dilaksanakan untuk memperingati...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* --- Row 2: Program Kerja (TAMBAHAN BARU) --- */}
        <Row className="mb-4">
          {/* Card 4 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/lk.jpeg" alt="Latihan Kepemimpinan" />
              <Card.Body>
                <Card.Title>Latihan Kepemimpinan</Card.Title>
                <Card.Text className="small text-muted">
                  Latihan Kepemimpinan (LK) merupakan salah satu program kerja unggulan yang dirancang untuk...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 5 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/ppd.jpeg" alt="Pekan Penghayatan Dhamma" />
              <Card.Body>
                <Card.Title>Pekan Penghayatan Dhamma</Card.Title>
                <Card.Text className="small text-muted">
                  Pekan Penghayatan Dhamma dirancang sebagai sarana untuk meningkatkan pemahaman...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 6 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/md.jpeg" alt="Metta Day" />
              <Card.Body>
                <Card.Title>Metta Day</Card.Title>
                <Card.Text className="small text-muted">
                  Metta Day merupakan program kerja yang diselenggarakan sebagai perwujudan cinta kasih...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* --- Row 3: Program Kerja (TAMBAHAN BARU) --- */}
        <Row className="mb-4">
          {/* Card 7 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/bc.jpeg" alt="Buddhist Camp" />
              <Card.Body>
                <Card.Title>Buddhist Camp</Card.Title>
                <Card.Text className="small text-muted">
                  Buddhist Camp dirancang sebagai pengalaman unik yang menggambarkan konsep camping...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 8 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/dbf.jpeg" alt="Dharmayana Buddhist Festival" />
              <Card.Body>
                <Card.Title>Dharmayana Buddhist Festival</Card.Title>
                <Card.Text className="small text-muted">
                  Acara tahunan yang diselenggarakan oleh Dharmayana Universitas Tarumanagara...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Card 9 */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/bd1.jpeg" alt="Berita Dharmayana" />
              <Card.Body>
                <Card.Title>Berita Dharmayana</Card.Title>
                <Card.Text className="small text-muted">
                  Berita Dharmayana berperan sebagai media komunikasi dan informasi untuk menyebarkan...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        {/* --- Row Kegiatan Sehari-hari (TIDAK DIHAPUS) --- */}
        <h4 className="fw-bold mb-3">Kegiatan Sehari-hari</h4>
        <Row>
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/dhammaclass.jpeg" alt="Dharmaclass" />
              <Card.Body>
                <Card.Title>Dharmaclass</Card.Title>
                <Card.Text className="small text-muted">
                  forum reguler untuk mempelajari agama Buddha.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/vt.jpeg" alt="Volunteers" />
              <Card.Body>
                <Card.Title>Volunteers</Card.Title>
                <Card.Text className="small text-muted">
                  kegiatan sukarelawan untuk membantu kegiatan keagamaan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src="/images/sport.jpeg" alt="DM-Sport" />
              <Card.Body>
                <Card.Title>DM-Sport</Card.Title>
                <Card.Text className="small text-muted">
                  kegiatan olahraga untuk menjaga kesehatan tubuh...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      {/* =====================================================
        KOTAK PUTIH 2: FAQ, SPONSORS, FOOTER
        =====================================================
      */}
      <Container className="bg-light text-dark p-4 p-md-5 rounded shadow-sm mb-4">
        
        {/* --- Section FAQ --- */}
        <div className="mb-5">
          <Row className="text-center mb-4">
            <Col>
              <h2 className="fw-bold">Frequently Ask Questions</h2>
              <p className="text-muted">Hal-hal yang sering ditanyakan terkait Dharmayana.</p>
            </Col>
          </Row>
          <Row>
            {/* Kolom Kiri FAQ */}
            <Col md={6}>
              <div className="mb-3">
                <h6 className="fw-bold">Siapa saja yang dapat bergabung ke dalam Dharmayana?</h6>
                <p className="text-muted small">Seluruh civitas buddhis yang berada dalam Universitas Tarumanagara merupakan anggota Dharmayana...</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Apa saja kegiatan Dharmayana?</h6>
                <p className="text-muted small">Kegiatan di Dharmayana pastinya bertujuan untuk menambah pengenalan tentang Buddha Dharma...</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Apakah ada majalah di Dharmayana Untar?</h6>
                <p className="text-muted small">Tentu saja ada. Apabila ada yang tertarik seputar majalah, kalian bisa bergabung ke tim Berita Dharmayana.</p>
              </div>
            </Col>
            {/* Kolom Kanan FAQ */}
            <Col md={6}>
              <div className="mb-3">
                <h6 className="fw-bold">Apakah menjadi anggota biasa berarti menjadi pengurus/panitia Dharmayana?</h6>
                <p className="text-muted small">Bukan ya. Tapi selama kamu civitas aktif buddhis di Universitas Tarumanagara, kamu dapat mendaftar...</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Apa saja kepengurusan Dharmayana?</h6>
                <p className="text-muted small">Badan Pengurus Harian Dharmayana terdiri dari 6 divisi...</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Apakah boleh hanya menjadi panitia program kerja saja?</h6>
                <p className="text-muted small">Bisa. Kamu bisa bergabung sebagai panitia program kerja saja. Tapi, kamu harus mendaftar...</p>
              </div>
            </Col>
          </Row>
        </div>

        {/* --- Section Sponsors --- */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Sponsors</h2>
          <p className="text-muted">Kami berterima kasih kepada sponsor yang telah mendukung kegiatan Dharmayana.</p>
          <Row className="align-items-center justify-content-center g-4">
            <Col xs={6} md="auto">
              <Image src="/images/sponsor/kmb.png" alt="Sponsor 1" style={{ height: '50px' }} />
            </Col>
            <Col xs={6} md="auto">
              <Image src="/images/sponsor/omef.png" alt="Sponsor 2" style={{ height: '50px' }} />
            </Col>
            <Col xs={6} md="auto">
              <Image src="/images/sponsor/daxtone.png" alt="Sponsor 3" style={{ height: '70px' }} />
            </Col>
            <Col xs={6} md="auto">
              <Image src="/images/sponsor/lasegar.png" alt="Sponsor 4" style={{ height: '50px' }} />
            </Col>
            <Col xs={6} md="auto">
              <Image src="/images/sponsor/patria.png" alt="Sponsor 5" style={{ height: '50px' }} />
            </Col>
          </Row>
        </div>

        <hr />

        {/* --- Footer (di dalam kotak putih) --- */}
        <div className="text-center text-muted pt-3">
          <h5 className="fw-bold text-dark">KMB Dharmayana Untar</h5>
          <p className="small">Terima kasih telah mengunjungi Dharmayana. Kami hadir untuk mendukung komunitas yang lebih baik.</p>
          <p className="small mb-2">© 2024 Dharmayana. All rights reserved.</p>
          <div className="mb-3">
            <a href="#!" className="text-dark me-3"><FaInstagram size={20} /></a>
            <a href="#!" className="text-dark"><FaFacebookF size={20} /></a>
          </div>
          <p className="small">Email: dharmayana_untar@yahoo.com | Tel: +62 895 1838 1145</p>
        </div>

      </Container>
    </>
  );
}