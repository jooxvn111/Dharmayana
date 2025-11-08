// src/app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
// Jika Anda ingin custom warna, buat file ini dan import
import './custom.css'; 

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import komponen kita
import NavbarComponent from '../components/Navbar';
import FooterComponent from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dharmayana',
  description: 'Website untuk Dharmayana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Tambahkan Navbar di sini */}
        <NavbarComponent />
        
        {/* Ini adalah konten halaman Anda (page.tsx) */}
        <main>
          {children}
        </main>
        
        {/* Tambahkan Footer di sini */}
      </body>
    </html>
  );
}