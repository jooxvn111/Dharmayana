import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import LayoutContent from "./layoutContent"; // client component
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dharmayana",
  description: "Website untuk Dharmayana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* Toaster supaya semua halaman bisa tampil notifikasi */}
        <Toaster position="top-right" />
        
        {/* Layout utama */}
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
