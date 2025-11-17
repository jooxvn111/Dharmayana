

import Image from "next/image";
import styles from "./GalleryAdmin.module.css";

const allImages = [
  { url: "/images/gallery-dwp/baby.jpg", title: "DWP" },
  { url: "/images/gallery-dwp/image.png", title: "DWP" },
  { url: "/images/gallery-dwp/rokok.jpg", title: "DWP" },
  
  { url: "/images/gallery-kathina/kucing.jpg", title: "Kathina" },
  { url: "/images/gallery-kathina/oo.jpg", title: "Kathina" },
  { url: "/images/gallery-kathina/sad.jpg", title: "Kathina" },

  { url: "/images/gallery-dd/burung.jpg", title: "Darmadhista" },
  { url: "/images/gallery-dd/bwa.jpg", title: "Darmadhista" },
  { url: "/images/gallery-dd/cachedImage.png", title: "Darmadhista" },
];



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