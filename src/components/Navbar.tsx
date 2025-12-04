"use client";

import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant="dark"
      className={scrolled ? "navbar-scrolled" : "navbar-transparent"}
    >
      <Container>
        {/* Update 1: Brand Link ke /site */}
        <Navbar.Brand href="/site" className="fw-bold fs-3 brand-text">
          Dharmayana
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto align-items-center gap-3">
            {/* Update 2: Home Link */}
            <Nav.Link href="/site" className="fw-medium">Home</Nav.Link>
            
            {/* Update 3: About Link */}
            <Nav.Link href="/about" className="fw-medium">About</Nav.Link>
            
            {/* Update 4: Activity Link */}
            <Nav.Link href="/site/activity" className="fw-medium">Activity</Nav.Link>

            {/* === TAMBAHAN BARU: GALLERY === */}
            <Nav.Link href="/site/gallery" className="fw-medium">Gallery</Nav.Link>
            
            {/* Contact tetap /contact */}
            <Nav.Link href="/contact" className="fw-medium">Contact</Nav.Link>

            {/* Tombol Login */}
            <Link href="/login">
              <Button
                className="btn-login rounded-pill px-4 fw-bold text-white"
                style={{ backgroundColor: "#E76F51", border: "none" }}
              >
                Login
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}