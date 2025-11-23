"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { 
  FaBullseye, FaHandsHelping, FaUsers, FaNewspaper, 
  FaSearchPlus, FaSearchMinus, FaRedo, FaExpand, FaCompress, FaDownload, FaSpinner 
} from "react-icons/fa";
import html2canvas from 'html2canvas';

// --- TIPE DATA ---
type Member = {
  _id: string;
  nama: string;
  jabatan: string;
  divisi: string;
  parentId: string | null;
  gambar?: string;
  children?: Member[];
  isTemplate?: boolean;
};

// --- FUNGSI BUILD TREE ---
function buildTreeWithFixedStructure(members: any[]) {
  const memberMap: any = {};
  const rootNode: Member = {
    _id: "root-dharmayana", nama: "KMB UNTAR", jabatan: "DHARMAYANA",
    divisi: "ALL", parentId: null, children: [], isTemplate: true,
    gambar: "/images/logo-untar.png" 
  };
  const bphNode: Member = {
    _id: "template-bph", nama: "B P H", jabatan: "DIVISI", 
    divisi: "BPH", parentId: "root-dharmayana", children: [], isTemplate: true,
    gambar: "/images/icon-bph.png" 
  };
  const bdNode: Member = {
    _id: "template-bd", nama: "B D", jabatan: "DIVISI", 
    divisi: "BD", parentId: "root-dharmayana", children: [], isTemplate: true,
    gambar: "/images/icon-bd.png" 
  };

  rootNode.children?.push(bphNode, bdNode); 

  members.forEach(member => { memberMap[member._id] = { ...member, children: [] }; });

  members.forEach(member => {
    if (member.parentId && memberMap[member.parentId]) {
      memberMap[member.parentId].children.push(memberMap[member._id]);
    } else {
      if (member.divisi === 'BPH') bphNode.children?.push(memberMap[member._id]); 
      else if (member.divisi === 'BD') bdNode.children?.push(memberMap[member._id]);
    }
  });
  return [rootNode];
}

// --- KOMPONEN NODE ---
const TreeNode = ({ node }: { node: Member }) => {
  const isTemplate = node.isTemplate;
  const isRoot = node._id === "root-dharmayana";
  let cardClass = "org-member-card";
  if (isRoot) cardClass += " root-card"; 
  else if (isTemplate) cardClass += " template-card";

  return (
    <li>
      <div className={cardClass}>
        <img 
            src={node.gambar || "/images/default-profile.jpg"} 
            alt={node.nama} 
            className="org-member-photo"
            style={{display: 'block'}}
            onError={(e) => { (e.target as HTMLImageElement).src = "/images/default-profile.jpg"; }}
        />
        <div className="org-member-role">{node.jabatan}</div>
        <div className="org-member-name">{node.nama}</div>
      </div>
      
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => <TreeNode key={child._id} node={child} />)}
        </ul>
      )}
    </li>
  );
};

export default function AboutPage() {
  const [treeData, setTreeData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [scale, setScale] = useState(1); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/bph"); 
        const data = await res.json();
        if (Array.isArray(data)) {
          const structuredTree = buildTreeWithFixedStructure(data); 
          setTreeData(structuredTree);
          if(data.length > 10) setScale(0.8);
        }
      } catch (error) { console.error("Error:", error); } 
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5)); 
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.3)); 
  const resetZoom = () => setScale(1);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const downloadImage = useCallback(async () => {
    if (!treeRef.current) return;
    setIsDownloading(true);

    try {
      const originalStyle = treeRef.current.style.transform;
      treeRef.current.style.transform = "scale(1)";
      treeRef.current.style.transformOrigin = "top left";

      const canvas = await html2canvas(treeRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        ignoreElements: (element) => false
      });

      treeRef.current.style.transform = originalStyle;
      treeRef.current.style.transformOrigin = "";

      const link = document.createElement('a');
      link.download = 'struktur-dharmayana.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

    } catch (err) {
      console.error("Gagal download:", err);
      alert("Gagal membuat gambar. Coba refresh halaman.");
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="about-hero-section">
        <Container>
          {/* Perhatikan: style ditaruh DI DALAM tag h1 */}
          <h1 
            className="about-hero-title" 
            style={{ color: '#FFFFFF' }} 
          >
            Tentang Kami
          </h1>

          {/* Jika ingin mengubah warna paragraf juga */}
          <p 
            className="lead opacity-75" 
            style={{ color: '#FFFFFF' }}
          >
            Mengenal lebih dekat KMB Dharmayana Untar
          </p>
        </Container>
      </div>

      <Container className="mb-5">
        {/* === BAGIAN 1: PENJELASAN (SUDAH DIISI LENGKAP) === */}
        <Row className="align-items-center mb-5 g-5">
          <Col md={6}>
             <Image 
                src="/images/contact.jpeg" 
                alt="Tentang Dharmayana" 
                fluid 
                className="rounded-4 shadow-lg border border-4 border-white"
             />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold text-secondary mb-3">Keluarga Mahasiswa Buddhis Dharmayana</h2>
            <div style={{width: '60px', height: '4px', background:'#E76F51', marginBottom:'20px'}}></div>
            <p className="text-justify-custom">
              Dharmayana Universitas Tarumanagara adalah sebuah wadah organisasi yang bersifat 
              kekeluargaan dan keagamaan bagi seluruh umat Buddha di Universitas Tarumanagara.
            </p>
            <p className="text-justify-custom">
              Nama <strong>"Dharmayana"</strong> sendiri memiliki arti "Kendaraan Dharma" atau "Jalan Kebenaran". 
              Kami berkomitmen untuk menjadi tempat bernaung yang hangat, mengembangkan diri, dan 
              mempraktikkan nilai-nilai luhur ajaran Buddha dalam kehidupan kampus sehari-hari.
            </p>
          </Col>
        </Row>
        
        {/* === BAGIAN 2: VISI & MISI (SUDAH DIISI) === */}
        <Row className="mb-5 g-4">
            <Col md={6}>
                <div className="vision-card">
                    <div className="text-center text-danger">
                        <FaBullseye className="card-icon-large" />
                        <h3 className="fw-bold mb-3">Visi Kami</h3>
                    </div>
                    <p className="text-center mb-0 fst-italic">
                        "Menjadi wadah unggulan dalam membentuk mahasiswa Buddhis yang berintegritas, 
                        bijaksana, dan menjunjung tinggi nilai-nilai Dhamma dalam kehidupan bermasyarakat."
                    </p>
                </div>
            </Col>
            <Col md={6}>
                <div className="mission-card">
                    <div className="text-center">
                        <FaHandsHelping className="card-icon-large" />
                        <h3 className="fw-bold mb-3">Misi Kami</h3>
                    </div>
                    <ul className="mb-0 ps-3 small">
                        <li className="mb-2">Meningkatkan pemahaman dan praktik Dhamma.</li>
                        <li className="mb-2">Mempererat tali persaudaraan antar anggota.</li>
                        <li>Melakukan kegiatan sosial yang bermanfaat bagi masyarakat luas.</li>
                    </ul>
                </div>
            </Col>
        </Row>

        {/* === BAGIAN 3: DIVISI (SUDAH DIPERBAIKI: BD = BERITA DHARMAYANA) === */}
        <div className="division-section">
            <Row className="px-4">
                <Col md={6} className="text-center p-4">
                    <FaUsers size={50} color="#8D1D2C" className="mb-3"/>
                    <h3 className="division-title">BPH (Badan Pengurus Harian)</h3>
                    <p className="text-muted small">
                        Bertanggung jawab atas roda organisasi secara keseluruhan, 
                        mengatur administrasi, keuangan, dan koordinasi antar divisi kegiatan. 
                        Tulang punggung manajerial Dharmayana.
                    </p>
                </Col>
                
                <Col md={6} className="position-relative">
                    <div className="d-none d-md-block position-absolute start-0 top-0 bottom-0 border-start border-2 border-secondary opacity-25"></div>
                    
                    <div className="text-center p-4">
                        {/* Icon Koran/Berita */}
                        <FaNewspaper size={50} color="#E76F51" className="mb-3"/> 
                        <h3 className="division-title">BD (Berita Dharmayana)</h3>
                        <p className="text-muted small">
                            Divisi yang bergerak di bidang jurnalistik, media, dan informasi. 
                            Bertugas menyebarkan kabar Dhamma, meliput kegiatan organisasi, 
                            dan menerbitkan majalah serta konten digital kreatif.
                        </p>
                    </div>
                </Col>
            </Row>
        </div>

        {/* === BAGIAN 4: STRUKTUR ORGANISASI === */}
        <Row className="text-center mb-3 mt-5">
            <Col>
                <h2 className="fw-bold text-secondary">Struktur Kepengurusan</h2>
                <p className="text-muted">Hierarki kepengurusan KMB Dharmayana Periode Ini</p>
            </Col>
        </Row>
        
        <div className={`org-tree-container ${isFullscreen ? 'fullscreen-mode' : ''}`}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="text-muted">Memuat struktur...</p>
                </div>
            ) : (
                <>
                    <div className="org-tree-scroll-area">
                        <div 
                            className="org-tree-wrapper" 
                            style={{ transform: `scale(${scale})` }}
                        >
                            <div className="org-tree org-tree-export-bg" ref={treeRef}>
                                <ul>
                                    {treeData.map((rootNode) => (
                                        <TreeNode key={rootNode._id} node={rootNode} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="tree-controls-floating">
                        <Button variant="light" className="rounded-circle border-0" size="sm" onClick={zoomOut} title="Zoom Out"><FaSearchMinus /></Button>
                        <span className="fw-bold text-secondary small" style={{minWidth: '45px', textAlign: 'center'}}>{Math.round(scale * 100)}%</span>
                        <Button variant="light" className="rounded-circle border-0" size="sm" onClick={zoomIn} title="Zoom In"><FaSearchPlus /></Button>
                        <div className="vr mx-2 text-secondary opacity-25"></div>
                        <Button variant="light" className="rounded-pill px-3 border-0 text-secondary fw-bold" size="sm" onClick={resetZoom}><FaRedo className="me-1"/> Reset</Button>
                        <Button variant={isFullscreen ? "primary" : "light"} className="rounded-circle border-0" size="sm" onClick={toggleFullscreen} title="Layar Penuh">{isFullscreen ? <FaCompress /> : <FaExpand />}</Button>
                        <div className="vr mx-2 text-secondary opacity-25"></div>
                        <Button variant="success" className="rounded-pill px-3 fw-bold shadow-sm" size="sm" onClick={downloadImage} disabled={isDownloading}>
                            {isDownloading ? <FaSpinner className="fa-spin" /> : <><FaDownload className="me-2"/>PNG</>}
                        </Button>
                    </div>
                </>
            )}
        </div>
      </Container>
    </>
  );
}