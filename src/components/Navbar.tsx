"use client";

import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      variant="dark"  // <--- UBAH INI JADI "dark" SAJA (Hapus logic scrolled ? light : dark)
      className={scrolled ? "navbar-scrolled" : "navbar-transparent"}
    >
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-3 brand-text">
          Dharmayana
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="/" className="fw-medium">Home</Nav.Link>
            <Nav.Link href="/about" className="fw-medium">About</Nav.Link>
            <Nav.Link href="/activity" className="fw-medium">Activity</Nav.Link>
            <Nav.Link href="/contact" className="fw-medium">Contact</Nav.Link>
            
            <Link href="/login">
              <Button className="btn-login rounded-pill px-4 fw-bold text-white" style={{backgroundColor: '#E76F51', border: 'none'}}>
                Login
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}