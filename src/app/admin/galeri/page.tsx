// app/admin/galeri/page.tsx

import Image from "next/image";
import styles from "./GalleryAdmin.module.css";

// Daftar gambar "hard-coded" yang sama
// seperti di halaman activity Anda.
const allImages = [
  // Galeri DWP
  { url: "/images/gallery-dwp/baby.jpg", title: "DWP" },
  { url: "/images/gallery-dwp/image.png", title: "DWP" },
  { url: "/images/gallery-dwp/rokok.jpg", title: "DWP" },
  
  // Galeri Kathina
  { url: "/images/gallery-kathina/kucing.jpg", title: "Kathina" },
  { url: "/images/gallery-kathina/oo.jpg", title: "Kathina" },
  { url: "/images/gallery-kathina/sad.jpg", title: "Kathina" },
  
  // Galeri Darmadhista
  { url: "/images/gallery-dd/burung.jpg", title: "Darmadhista" },
  { url: "/images/gallery-dd/bwa.jpg", title: "Darmadhista" },
  { url: "/images/gallery-dd/cachedImage.png", title: "Darmadhista" },
];


// Halaman ini tidak 'async' karena tidak fetch data
export default function AdminGalleryPage() {

  return (
    <>
      <div className={styles.header}>
        <h1>Manajemen Galeri</h1>
        <p>Semua gambar dari semua program kegiatan.</p>
      </div>

      {allImages.length > 0 ? (
        <div className={styles.gridContainer}>
          {allImages.map((image, index) => (
            <div key={index} className={styles.imageCard}>
              <Image
                src={image.url}
                alt={`Galeri ${image.title} - ${index + 1}`}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noImages}>
          Belum ada gambar di galeri program manapun.
        </p>
      )}
    </>
  );
}