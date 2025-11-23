"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Modal, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { format } from "date-fns";       // Import Date FNS
import { id } from "date-fns/locale";    // Import Locale Indonesia

export default function Home() {
  const [program, setProgram] = useState<any[]>([]);
  
  // State Modal & Carousel
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Load Data Program
  async function loadProgram() {
    try {
      // TAMBAHAN: cache: "no-store" agar data selalu update (mengatasi masalah tanggal tidak muncul)
      const res = await fetch("/api/program", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProgram(data);
      } else {
        setProgram([]);
      }
    } catch (err) {
      console.error(err);
      setProgram([]);
    }
  }

  useEffect(() => {
    loadProgram();
  }, []);

  // Handle Klik Kartu
  const handleCardClick = (item: any) => {
    setSelectedProgram(item);
    setActiveImageIndex(0); 
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Logic Carousel
  const imageList = selectedProgram
    ? [
        selectedProgram.gambar || "/images/default.jpg", 
        ...(Array.isArray(selectedProgram.galeri) ? selectedProgram.galeri : [])
      ].filter(Boolean) 
    : [];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-start");
    if(contentSection) contentSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* === HERO SECTION (VIDEO) - Kode Asli Anda === */}
      <div className="heroVideoSection">
        <video autoPlay loop muted playsInline className="videoBackground">
          <source src="https://cdn.coverr.co/videos/coverr-meditating-by-the-river-5219/1080p.mp4" type="video/mp4" />
        </video>
        <div className="videoOverlay"></div>
        <Container className="heroContent">
          <div className="mb-4">
             <Image 
                src="/images/untar.png" 
                alt="Untar Logo" 
                style={{ height: "80px", filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(0,0,0,0.5))" }} 
             />
          </div>
          <h1 className="heroTitleVideo">Welcome to Dharmayana</h1>
          <p className="heroSubtitleVideo">
            Menjalin persaudaraan, mengembangkan kebijaksanaan, dan berbagi kebahagiaan 
            dalam naungan Dhamma di Universitas Tarumanagara.
          </p>
          <button 
            onClick={scrollToContent}
            className="btn btn-lg rounded-pill px-5 fw-bold shadow-lg text-white border-0" 
            style={{backgroundColor: '#E76F51', transition: 'transform 0.3s'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Lihat Kegiatan Kami
          </button>
        </Container>
        <div className="scrollDown" onClick={scrollToContent}>
            <span className="small d-block mb-1 fw-bold">Scroll Down</span>
            <FaChevronDown size={20} />
        </div>
      </div>

      {/* === PROGRAM SECTION === */}
      <div id="content-start"></div> 
      
      <Container className="py-5 mt-4 mb-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold" style={{color: '#8D1D2C', fontFamily: 'Playfair Display, serif'}}>
                Kegiatan Dharmayana
            </h2>
            <div style={{width:'80px', height:'4px', backgroundColor:'#E76F51', margin:'0 auto 20px', borderRadius:'2px'}}></div>
            <p className="text-muted">Program kerja dan dokumentasi kegiatan terbaru.</p>
          </Col>
        </Row>

        <Row>
          {Array.isArray(program) && program.length > 0 ? (
            program.map((item) => (
              <Col md={4} className="mb-4" key={item._id}>
                <div onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden program-card-hover">
                    <div className="overflow-hidden position-relative" style={{height: '220px'}}>
                      <Card.Img 
                        variant="top" 
                        src={item.gambar || "/images/default.jpg"} 
                        className="w-100 h-100 object-fit-cover transition-transform"
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 p-3" 
                           style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'}}>
                      </div>
                    </div>
                    <Card.Body className="p-4">
                      <Card.Title className="fw-bold mb-2" style={{color: '#8D1D2C', fontFamily:'Playfair Display'}}>
                        {item.nama}
                      </Card.Title>
                      
                      {/* --- TAMBAHAN KECIL: TANGGAL DI CARD --- */}
                      <div className="small text-danger fw-bold mb-2">
                         📅 {item.tanggal ? format(new Date(item.tanggal), "d MMMM yyyy", { locale: id }) : ""}
                      </div>

                      <Card.Text className="small text-muted mb-3" style={{
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                      }}>
                        {item.deskripsi}
                      </Card.Text>
                      <span className="fw-bold text-warning small text-uppercase letter-spacing-1">
                        Lihat Detail →
                      </span>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <div className="p-5 bg-white rounded-4 shadow-sm border border-light">
                <p className="text-muted m-0 fst-italic">Belum ada program kerja ditambahkan.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>

      {/* === MODAL POPUP (KODE ANDA + FITUR TANGGAL) === */}
      <Modal 
        show={showModal} 
        onHide={handleClose} 
        centered 
        size="lg"
        contentClassName="custom-modal-content"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold fs-3" style={{ color: '#8D1D2C', fontFamily: 'Playfair Display' }}>
            {selectedProgram?.nama}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-0">
            <div className="carousel-container-fixed"> 
                <Image 
                    src={imageList[activeImageIndex]} 
                    className="carousel-image-fixed" 
                    alt="Program Slide"
                    width={800} 
                    height={400}
                />
                {imageList.length > 1 && (
                    <>
                        <button className="carousel-btn prev-btn" onClick={prevImage}><FaChevronLeft /></button>
                        <button className="carousel-btn next-btn" onClick={nextImage}><FaChevronRight /></button>
                        <div className="carousel-counter-overlay">{activeImageIndex + 1} / {imageList.length}</div>
                    </>
                )}
            </div>
            
            <div className="px-2 pb-3 mt-3">
                {/* === FITUR TANGGAL YANG ANDA MINTA (VERSI BOOTSTRAP) === */}
                <div className="alert alert-light border border-danger d-flex align-items-center p-3 mb-4 rounded-3">
                    <span className="fs-2 me-3">📅</span>
                    <div>
                        <small className="text-muted fw-bold text-uppercase d-block">Waktu Pelaksanaan</small>
                        <span className="fs-5 fw-bold text-danger">
                            {selectedProgram?.tanggal 
                                ? format(new Date(selectedProgram.tanggal), "EEEE, d MMMM yyyy", { locale: id }) 
                                : "Tanggal belum diatur"}
                        </span>
                    </div>
                </div>
                {/* ======================================================== */}

                <h5 className="fw-bold mb-2" style={{color: '#E76F51'}}>Deskripsi Kegiatan</h5>
                <p className="text-muted" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                    {selectedProgram?.deskripsi}
                </p>
            </div>
        </Modal.Body>
        
        <Modal.Footer className="border-0">
           <Button variant="secondary" onClick={handleClose} className="rounded-pill px-4">
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}