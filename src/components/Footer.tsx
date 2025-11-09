// src/components/Footer.tsx
import { Container, Row, Col } from 'react-bootstrap';

export default function FooterComponent() {
  return (
    <footer className="bg-light py-4 mt-auto border-top">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Dharmayana</h5>
            <p className="text-muted small">
              Deskripsi singkat organisasi.
            </p>
          </Col>
          
          <Col>
            <h6>Link</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted">Home</a></li>
              <li><a href="/about" className="text-muted">About</a></li>
            </ul>
          </Col>
          <Col>
            <h6>Link</h6>
            <ul className="list-unstyled">
              <li><a href="/activity" className="text-muted">Activity</a></li>
              <li><a href="/contact" className="text-muted">Contact</a></li>
            </ul>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <small className="text-muted">
            © {new Date().getFullYear()} Dharmayana. All Rights Reserved.
          </small>
        </div>
      </Container>
    </footer>
  );
}