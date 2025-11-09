// src/app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; 

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <NavbarComponent />
        
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}