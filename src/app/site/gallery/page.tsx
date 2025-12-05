"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button, Image } from "react-bootstrap";
import NavbarComponent from "@/components/Navbar";

interface GalleryItem {
  _id: string;
  title: string;
  url: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (Array.isArray(data)) {
          setGalleries(data);
        }
      } catch (error) {
        console.error("Gagal load gallery:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const handleImageClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <>
      <NavbarComponent />

      <div style={{ paddingTop: "120px", paddingBottom: "60px", backgroundColor: "#8D1D2C" }}>
        <Container className="text-center">
          <h2 className="fw-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
            Galeri Dokumentasi
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#E76F51",
              margin: "0 auto 20px",
              borderRadius: "2px",
            }}
          ></div>
          <p className="text-white-50 fw-medium">
            Momen kebersamaan dan kegiatan KMB Dharmayana Untar.
          </p>
        </Container>
      </div>

      <Container className="py-5" style={{ minHeight: "50vh" }}>
        {loading ? (
          <p className="text-center text-muted py-5">Memuat foto...</p>
        ) : (
          <Row className="g-4">
            {galleries.length > 0 ? (
              galleries.map((item) => (
                <Col md={4} sm={6} xs={12} key={item._id}>
                  <Card
                    className="h-100 border-0 shadow rounded-4 overflow-hidden"
                    onClick={() => handleImageClick(item)}
                    style={{ cursor: "pointer", transition: "transform 0.3s" }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <div style={{ height: "280px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={item.url}
                        alt={item.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <div className="p-5 bg-light rounded-4 shadow-sm border">
                  <p className="text-muted m-0 fst-italic fw-medium">
                    Belum ada foto di galeri saat ini.
                  </p>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title style={{ color: "#8D1D2C", fontFamily: "Playfair Display" }}>
            {selectedItem?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center p-0 bg-dark d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          {selectedItem && (
            <Image
              src={selectedItem.url}
              alt={selectedItem.title}
              className="img-fluid"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pb-4">
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="rounded-pill px-4 fw-bold"
          >
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
