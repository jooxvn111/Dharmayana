"use client";

import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="custom-footer">
      <Container className="py-5">
        <Row className="gy-4">
          <Col md={4}>
            <h4
              className="fw-bold text-white mb-3"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Dharmayana Untar
            </h4>
            <p className="text-white-50 small">
              Wadah kekeluargaan mahasiswa Buddhis Universitas Tarumanagara.
              Menjunjung tinggi semangat Metta, Karuna, Mudita, dan Upekkha.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaYoutube /></a>
            </div>
          </Col>

          <Col md={2} xs={6}>
            <h6 className="fw-bold text-warning mb-3">Menu</h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/activity" className="footer-link">Activity</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </Col>

          <Col md={2} xs={6}>
            <h6 className="fw-bold text-warning mb-3">Kegiatan</h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
              <li><a href="#" className="footer-link">Dhammaclass</a></li>
              <li><a href="#" className="footer-link">Bakti Sosial</a></li>
              <li><a href="#" className="footer-link">Perayaan Waisak</a></li>
              <li><a href="#" className="footer-link">Gathering</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold text-warning mb-3">Hubungi Kami</h6>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2 d-flex gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>Universitas Tarumanagara, Kampus 1, Gedung M Lt. 2</span>
              </li>
              <li className="d-flex gap-2">
                <FaEnvelope className="mt-1 flex-shrink-0" />
                <span>dharmayana@untar.ac.id</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="copyright-bar text-center py-3">
        <small className="text-white-50">
          &copy; {new Date().getFullYear()} KMB Dharmayana Untar. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}
