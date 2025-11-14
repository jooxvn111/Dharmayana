// src/components/Navbar.tsx
"use client";

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link href="/" className="navbar-brand">
            Dharmayana
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-3">

            <Link href="/" className="nav-link">
              Home
            </Link>

            <Link href="/about" className="nav-link">
              About
            </Link>

            <Link href="/activity" className="nav-link">
              Activity
            </Link>

            <Link href="/contact" className="nav-link">
              Contact
            </Link>

          </Nav>

          <Link href="/login">
            <Button variant="primary">Login</Button>
          </Link>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
