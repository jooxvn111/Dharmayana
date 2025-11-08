// src/components/Navbar.tsx
"use client"; 

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* --- INI CARA BARU --- */}
        <Navbar.Brand as={Link} href="/">
          Dharmayana
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* --- LIHAT PERBEDAANNYA, LEBIH BERSIH --- */}
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/activity">
              Activity
            </Nav.Link>
            
            {/* --- Tombol "Contact" juga jadi Link --- */}
            <Button as={Link} href="/contact" variant="dark">
              Contact
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}