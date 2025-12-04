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
            {/* Update 2: Home Link ke /site */}
            <Nav.Link href="/site" className="fw-medium">Home</Nav.Link>
            
            {/* Update 3: About Link ke /site/about (Asumsi folder about ada di dalam site) */}
            <Nav.Link href="/site/about" className="fw-medium">About</Nav.Link>
            
            {/* Update 4: Activity Link ke /site/activity (INI YANG BIKIN ERROR 404 SEBELUMNYA) */}
            <Nav.Link href="/site/activity" className="fw-medium">Activity</Nav.Link>
            
            {/* Catatan: Contact tetap /contact karena di screenshot foldernya ada di LUAR folder site */}
            <Nav.Link href="/contact" className="fw-medium">Contact</Nav.Link>

            {/* Catatan: Login tetap /login karena di screenshot foldernya ada di LUAR folder site */}
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