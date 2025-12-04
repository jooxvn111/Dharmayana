"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Modal, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import NavbarComponent from "@/components/Navbar"; // Pastikan Navbar tetap ada

export default function Home() {
  const [program, setProgram] = useState<any[]>([]);
  
  // State untuk Modal & Carousel Gallery
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Load Data Program
  async function loadProgram() {
    try {
      // Gunakan relative path agar otomatis menyesuaikan domain/port
      const res = await fetch("/api/program");
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

  // --- LOGIC MODAL & CAROUSEL ---
  const handleCardClick = (item: any) => {
    setSelectedProgram(item);
    setActiveImageIndex(0); 
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Helper Format Tanggal
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'long', day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Helper YouTube ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // List Media (Gabungan Gambar Utama + Galeri)
  const mediaList = selectedProgram
    ? [
        { type: 'image', url: selectedProgram.gambar || "/images/default.jpg" }, 
        ...(Array.isArray(selectedProgram.galeri) ? selectedProgram.galeri : [])
          .filter(Boolean)
          .map((url: string) => {
            const youtubeId = getYouTubeVideoId(url);
            return youtubeId 
              ? { type: 'video', url: `C:\Users\ASUS\Dharmayana\public\videos\Teaser.mp4` } 
              : { type: 'image', url: url };
          })
      ] 
    : [];

  const nextMedia = () => {
    setActiveImageIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };
  const prevMedia = () => {
    setActiveImageIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-start");
    if(contentSection) contentSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Navbar kita pasang di sini agar muncul di atas video */}
      <NavbarComponent />

      {/* === HERO SECTION (VIDEOTRON) === */}
      <div className="heroVideoSection">
        
        {/* VIDEO BACKGROUND */}
        <video 
          autoPlay loop muted playsInline 
          className="videoBackground"
        >
          {/* Ganti src ini dengan video asli Dharmayana jika ada */}
          <source src="https://cdn.coverr.co/videos/coverr-meditating-by-the-river-5219/1080p.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY GELAP (Agar teks terbaca) */}
        <div className="videoOverlay"></div>

        {/* KONTEN TENGAH */}
        <Container className="heroContent">
          <div className="mb-4">
             <Image 
                src="/images/untar.png" 
                alt="Untar Logo" 
                style={{ height: "80px", filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(0,0,0,0.5))" }} 
             />
          </div>

          <h1 className="heroTitleVideo">
            Welcome to Dharmayana
          </h1>
          
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

        {/* SCROLL DOWN INDICATOR */}
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

      {/* === MODAL POPUP (Dengan Tanggal & Video) === */}
      <Modal 
        show={showModal} 
        onHide={handleClose} 
        centered 
        size="lg"
        contentClassName="custom-modal-content" // Class Global
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-3" style={{ color: '#8D1D2C', fontFamily: 'Playfair Display' }}>
            {selectedProgram?.nama}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-0">
            {/* TANGGAL EVENT */}
            {selectedProgram && selectedProgram.tanggalMulai && (
                <div className="d-flex align-items-center gap-2 mb-3 px-3 py-2 bg-light rounded-pill border border-warning text-muted small fw-bold" style={{width: 'fit-content', color: '#E76F51'}}>
                    <FaCalendarAlt className="text-danger" />
                    <span>
                        {formatDate(selectedProgram.tanggalMulai)} 
                        {selectedProgram.tanggalSelesai && selectedProgram.tanggalMulai !== selectedProgram.tanggalSelesai && 
                         ` - ${formatDate(selectedProgram.tanggalSelesai)}`}
                    </span>
                </div>
            )}

            {/* CAROUSEL MEDIA */}
            <div className="carousel-container-fixed mb-4"> 
                {mediaList.length > 0 && mediaList[activeImageIndex].type === 'image' ? (
                    <Image 
                        src={mediaList[activeImageIndex].url} 
                        className="carousel-image-fixed" 
                        alt="Program Slide"
                        width={800} 
                        height={400}
                    />
                ) : mediaList.length > 0 && mediaList[activeImageIndex].type === 'video' ? (
                    <iframe
                        src={mediaList[activeImageIndex].url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-100 h-100"
                        title="YouTube video player"
                    ></iframe>
                ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                        No Media
                    </div>
                )}

                {mediaList.length > 1 && (
                    <>
                        <button className="carousel-btn prev-btn" onClick={prevMedia}><FaChevronLeft /></button>
                        <button className="carousel-btn next-btn" onClick={nextMedia}><FaChevronRight /></button>
                        <div className="carousel-counter-overlay">{activeImageIndex + 1} / {mediaList.length}</div>
                    </>
                )}
            </div>
            
            <div className="px-2 pb-3">
                <h5 className="fw-bold mb-2" style={{color: '#E76F51'}}>Deskripsi Kegiatan</h5>
                <p className="text-muted" style={{ lineHeight: '1.8', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
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