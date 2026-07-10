import React, { useState, useEffect, useRef, useCallback } from 'react';
import { router } from '@inertiajs/react';
import Icon from '../../Components/Icons.jsx';
import gsap from 'gsap';

// ─── Program Keahlian ───────────────────────────────────────────────────────
const programs = [
  {
    kode: 'APHP',
    nama: 'Agribisnis Pengolahan Hasil Pertanian',
    emoji: '👩🏻‍🍳',
    desc: 'Mempelajari teknologi pengolahan hasil pertanian menjadi produk bernilai tinggi, termasuk teknik budidaya modern dan manajemen kualitas.',
    icon: 'chef',
    competencies: ['Pengolahan Tanaman', 'Pengembangan Produk Agrikultur', 'Manajemen Kebun Pintar'],
    accent: 'hover:ring-amber-400 hover:shadow-amber-200/50 dark:hover:shadow-amber-500/20',
    iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    btnBg: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    kode: 'MPLB',
    nama: 'Manajemen Perkantoran & Layanan Bisnis',
    emoji: '💼',
    desc: 'Menyediakan keahlian administrasi perkantoran modern, layanan bisnis profesional, serta teknologi informasi kantor.',
    icon: 'briefcase',
    competencies: ['Administrasi Perkantoran', 'Manajemen Proyek', 'Layanan Pelanggan Profesional'],
    accent: 'hover:ring-blue-400 hover:shadow-blue-200/50 dark:hover:shadow-blue-500/20',
    iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    btnBg: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    kode: 'TKRO',
    nama: 'Teknik Kendaraan Ringan Otomotif',
    emoji: '🚙',
    desc: 'Mempelajari perawatan, perbaikan, dan rekayasa kendaraan ringan dengan standar industri terkini.',
    icon: 'car',
    competencies: ['Perawatan Kendaraan', 'Diagnostik Elektronik', 'Reparasi Mekanik'],
    accent: 'hover:ring-red-400 hover:shadow-red-200/50 dark:hover:shadow-red-500/20',
    iconBg: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    btnBg: 'bg-red-600 hover:bg-red-700',
  },
  {
    kode: 'TJKT',
    nama: 'Teknik Jaringan Komputer & Telekomunikasi',
    emoji: '🖥️',
    desc: 'Membangun dan mengelola infrastruktur jaringan komputer serta sistem telekomunikasi modern.',
    icon: 'computer',
    competencies: ['Administrasi Server', 'Cyber Security', 'Fiber Optic'],
    accent: 'hover:ring-emerald-400 hover:shadow-emerald-200/50 dark:hover:shadow-emerald-500/20',
    iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
  },
];

// ─── Data berita & agenda ────────────────────────────────────────────────────
const newsItems = [
  {
    title: 'Siswa TJKT SMK Sulthan Baruna Sabet Juara LKS Tingkat Provinsi',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    category: 'PRESTASI',
    date: '30 Juni 2026',
    desc: 'Tim TJKT berhasil meraih juara pada ajang Lomba Kompetensi Siswa tingkat provinsi Jawa Barat, mengharumkan nama sekolah.',
  },
  {
    title: 'Kunjungan Industri Jurusan APHP ke PT Indofood Sukses Makmur',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
    category: 'AKADEMIK',
    date: '20 Juni 2026',
    desc: 'Siswa APHP melakukan kunjungan industri untuk mempelajari proses produksi makanan skala besar secara langsung.',
  },
  {
    title: 'Uji Kompetensi Keahlian (UKK) Jurusan TKRO Bersama Asosiasi Industri',
    img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop',
    category: 'KEGIATAN',
    date: '10 Juni 2026',
    desc: 'Pelaksanaan UKK jurusan TKRO dengan penguji langsung dari asosiasi industri otomotif nasional.',
  },
];

// ─── Hero taglines ───────────────────────────────────────────────────────────
const taglines = [
  'Membangun Generasi Terampil dari Cidaun untuk Indonesia',
  'Empat Kompetensi Keahlian, Satu Visi Keunggulan',
  'Pendidikan Vokasi Berkualitas di Jantung Cianjur Selatan',
];

// ─── Kemitraan industri ──────────────────────────────────────────────────────
const partnershipData = {
  daihatsu: {
    name: 'PT Astra Daihatsu Motor',
    program: 'Program Pintar Bersama Daihatsu',
    jurusan: 'TKRO',
    desc: 'Sinkronisasi kurikulum mesin EFI (Electronic Fuel Injection) dan penerapan budaya industri 5S (Seiri, Seiton, Seiso, Seiketsu, Shitsuke) untuk membentuk teknisi otomotif berstandar pabrikan.',
    color: '#c53030',
  },
  telkom: {
    name: 'PT Telekomunikasi Indonesia',
    program: 'Lab Jaringan Cisco & Fiber Optic Network Academy',
    jurusan: 'TJKT',
    desc: 'Penyelarasan kurikulum jaringan komputer berbasis sertifikasi Cisco Networking Academy dan praktik instalasi jaringan Fiber Optic bersama teknisi Telkom.',
    color: '#c53030',
  },
  sariroti: {
    name: 'PT Nippon Indosari Corpindo',
    program: 'Kurikulum Pangan Higienis HACCP & Magang Industri',
    jurusan: 'APHP',
    desc: 'Implementasi standar HACCP (Hazard Analysis Critical Control Point) pada praktik pengolahan pangan serta program magang langsung di lini produksi Sari Roti.',
    color: '#d97706',
  },
  bri: {
    name: 'PT Bank Rakyat Indonesia',
    program: 'Simulasi Tata Kelola Administrasi Keuangan Perbankan Ritel',
    jurusan: 'MPLB',
    desc: 'Pelatihan simulasi administrasi perbankan ritel meliputi teller operation, customer service, dan pengelolaan arsip digital berstandar BRI.',
    color: '#005088',
  },
  indofood: {
    name: 'PT Indofood Sukses Makmur',
    program: 'Sinergi Mutu Laboratorium Pangan & Rantai Pasok Agroindustri',
    jurusan: 'APHP',
    desc: 'Kolaborasi mutu laboratorium pangan meliputi uji organoleptik, mikrobiologi dasar, dan pemahaman rantai pasok agroindustri dari hulu ke hilir.',
    color: '#1e40af',
  },
};

// ─── 5 Alumni Sukses ─────────────────────────────────────────────────────────
const alumni = [
  {
    index: '01',
    name: 'Sarah Amelia',
    grad: 'Lulusan 2022 • TJKT',
    role: 'Network Engineer',
    badge: 'CCNA Certified',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    quote: '"Fasilitas lab Cisco di TJKT sangat lengkap. SMK Sulthan Baruna menyiapkan mental & keterampilan saya hingga langsung direkrut."',
    borderColor: 'from-green-500 to-emerald-500',
    numberColor: 'text-green-500/20',
    tagColor: 'text-green-400',
    verticalText: 'TJKT',
  },
  {
    index: '02',
    name: 'Siti Rahmawati',
    grad: 'Lulusan 2021 • APHP',
    role: 'Pastry Chef / Owner',
    badge: 'Sertifikasi BNSP',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    quote: '"Berkat praktek pengolahan roti di APHP, saya berani membuka bakery sendiri yang kini berkembang pesat melayani katering."',
    borderColor: 'from-orange-500 to-pink-500',
    numberColor: 'text-orange-500/20',
    tagColor: 'text-orange-400',
    verticalText: 'APHP',
  },
  {
    index: '03',
    name: 'Budi Santoso',
    grad: 'Lulusan 2023 • TKRO',
    role: 'Mekanik Astra',
    badge: 'Astra Silver Tech',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
    quote: '"Magang di bengkel resmi Astra yang difasilitasi sekolah adalah batu loncatan karir saya menjadi mekanik utama."',
    borderColor: 'from-cyan-500 to-blue-500',
    numberColor: 'text-cyan-500/20',
    tagColor: 'text-cyan-400',
    verticalText: 'TKRO',
  },
  {
    index: '04',
    name: 'Rian Hidayat',
    grad: 'Lulusan 2020 • MPLB',
    role: 'Admin Supervisor',
    badge: 'MS Office Specialist',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    quote: '"Tata kelola perkantoran digital di MPLB mengajarkan saya efisiensi kerja. Kemampuan arsip cloud sangat dicari."',
    borderColor: 'from-purple-500 to-indigo-500',
    numberColor: 'text-purple-500/20',
    tagColor: 'text-purple-400',
    verticalText: 'MPLB',
  },
  {
    index: '05',
    name: 'Indra Wijaya',
    grad: 'Lulusan 2022 • TJKT',
    role: 'Cloud Engineer',
    badge: 'AWS Practitioner',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    quote: '"Dasar administrasi server di TJKT memberi saya fondasi kuat untuk sertifikasi AWS & meniti karir cloud computing."',
    borderColor: 'from-rose-500 to-pink-500',
    numberColor: 'text-rose-500/20',
    tagColor: 'text-rose-400',
    verticalText: 'TJKT',
  },
];

// ─── Star SVG ────────────────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.538 1.118L10 15.347l-3.376 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.632 9.384c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

// ─── BeritaAgendaSection ─────────────────────────────────────────────────────
function BeritaAgendaSection() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
        Berita & Agenda Sekolah
      </h2>
      <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
        Kabar terbaru dan agenda penting SMK Sulthan Baruna.
      </p>
      <div ref={containerRef} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsItems.map((item, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg group">
            <img src={item.img} alt={item.title} className="w-full h-48 object-cover aspect-video rounded-xl" />
            <span className="absolute top-2 left-2 bg-white/80 text-xs font-medium px-2 py-1 rounded">
              {item.category}
            </span>
            <div className="p-4">
              <p className="text-xs font-mono text-gray-500">{item.date}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-2">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{item.desc}</p>
              <a href="#" className="mt-4 inline-block text-indigo-600 hover:underline">Baca Selengkapnya</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Alumni Carousel ──────────────────────────────────────────────────────────
function AlumniCarousel() {
  const [activeIndex, setActiveIndex] = useState(2); // default center Budi Santoso
  const count = alumni.length;

  const cardTheme = {
    bg: 'bg-white dark:bg-slate-900',
    border: 'border-slate-200 dark:border-slate-800',
    text: 'text-slate-900 dark:text-slate-100',
    quoteText: 'text-slate-600 dark:text-slate-400',
    accentText: 'text-[#c59332]',
    numColor: 'text-slate-200/60 dark:text-slate-800/60',
    ring: 'ring-[#c59332]',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
    badgeBorder: 'border-slate-200 dark:border-slate-700',
  };

  const next = () => setActiveIndex((activeIndex + 1) % count);
  const prev = () => setActiveIndex((activeIndex - 1 + count) % count);

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[11px] font-bold tracking-widest text-[#c59332] uppercase mb-2">Inspirasi Nyata</p>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          Kisah Sukses Alumni
        </h2>
        <p className="mt-2 font-sans text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Lulusan SMK Sulthan Baruna yang telah berkarier dan berwirausaha di industri nasional.
        </p>
      </div>

      {/* Flat Sliding Carousel Container with Peeking Blur */}
      <div className="relative mx-auto flex items-center justify-center overflow-visible" style={{ height: 380, maxWidth: 800 }}>
        {alumni.map((a, i) => {
          let cardStyle = '';
          if (i === activeIndex) {
            cardStyle = 'blur-none scale-100 sm:scale-105 opacity-100 z-30 pointer-events-auto';
          } else if (i === (activeIndex - 1 + count) % count) {
            cardStyle = 'blur-[1px] scale-90 opacity-40 -translate-x-[70%] sm:-translate-x-[105%] z-20 pointer-events-auto cursor-pointer';
          } else if (i === (activeIndex + 1) % count) {
            cardStyle = 'blur-[1px] scale-90 opacity-40 translate-x-[70%] sm:translate-x-[105%] z-20 pointer-events-auto cursor-pointer';
          } else {
            cardStyle = 'opacity-0 pointer-events-none scale-75 z-10';
          }

          return (
            <div
              key={i}
              onClick={() => {
                if (i === (activeIndex - 1 + count) % count) prev();
                if (i === (activeIndex + 1) % count) next();
              }}
              className={`absolute transition-all duration-500 ease-out ${cardStyle}`}
              style={{ width: 285 }}
            >
              <div className={`relative ${cardTheme.bg} border ${cardTheme.border} rounded-2xl p-6 shadow-xl flex flex-col justify-between h-[310px] overflow-hidden`}>
                {/* Giant Background Number */}
                <span className={`absolute -top-2 -right-2 font-display text-8xl font-black select-none ${cardTheme.numColor} italic opacity-50`}>
                  {a.index}
                </span>

                <div className="relative z-10">
                  {/* Stars & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, starIdx) => (
                        <svg key={starIdx} className="w-3.5 h-3.5 fill-[#c59332]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.538 1.118L10 15.347l-3.376 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.632 9.384c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.957z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400/50 uppercase tracking-tighter">{a.verticalText}</span>
                  </div>

                  {/* Quote */}
                  <p className={`text-[13px] ${cardTheme.quoteText} leading-relaxed font-medium mb-6 relative`}>
                    <span className="text-2xl text-[#c59332] absolute -left-4 -top-2 opacity-30 font-serif">"</span>
                    {a.quote}
                  </p>
                </div>

                {/* Bottom details */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={a.img}
                      alt={a.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#c59332]/20 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className={`font-display text-[13px] font-bold ${cardTheme.text} truncate`}>{a.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500 font-medium tracking-tight truncate">{a.grad}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] font-extrabold text-[#c59332] uppercase tracking-wider truncate">{a.role}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${cardTheme.badgeBg} ${cardTheme.badgeText} border ${cardTheme.badgeBorder} whitespace-nowrap`}>
                      {a.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Absolute Left & Right Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 w-10 h-10 rounded-full flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-[#c59332] hover:text-white transition-all shadow-md active:scale-95"
          aria-label="Previous Alumni"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 w-10 h-10 rounded-full flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-[#c59332] hover:text-white transition-all shadow-md active:scale-95"
          aria-label="Next Alumni"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {alumni.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-300 ${
              i === activeIndex ? 'bg-[#c59332] w-6 h-2 rounded-full' : 'bg-slate-400 dark:bg-slate-700 w-2 h-2 rounded-full'
            }`}
            aria-label={`Go to alumni slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── HomeView ────────────────────────────────────────────────────────────────
export default function HomeView() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [activePartner, setActivePartner] = useState('daihatsu');
  const taglineRef = useRef(null);
  const detailRef = useRef(null);

  // Rotate tagline every 4s
  useEffect(() => {
    const timer = setInterval(() => setTaglineIdx(i => (i + 1) % taglines.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // GSAP SplitText line animation for tagline
  useEffect(() => {
    if (!taglineRef.current) return;
    const split = new SplitText(taglineRef.current, { type: 'lines', linesClass: 'split-line' });
    gsap.from(split.lines, { opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power2.out' });
    return () => split.revert();
  }, [taglineIdx]);

  // GSAP count animation
  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (target === 4)       counter.innerText = Math.floor(obj.val) + '+';
          else if (target === 20) counter.innerText = Math.floor(obj.val) + '+';
          else if (target === 95) counter.innerText = Math.floor(obj.val) + '%';
          else                    counter.innerText = Math.floor(obj.val);
        },
      });
    });
  }, []);

  return (
    <>
      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#111111] pt-20">
        <img
          src="/images/hero1.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.65 }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-4 flex flex-col justify-between h-full">
          <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto space-y-4 lg:space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/95 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Penerimaan Peserta Didik Baru 2026/2027
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-lg whitespace-nowrap">
              SMK Sulthan Baruna
            </h1>

            <p
              ref={taglineRef}
              key={taglineIdx}
              className="text-[#c59332] text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] uppercase max-w-2xl drop-shadow"
            >
              {taglines[taglineIdx]}
            </p>

            <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl font-medium drop-shadow">
              Sekolah kejuruan unggulan di Cidaun yang mencetak generasi terampil, berkarakter, dan siap bersaing di industri modern.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="/ppdb"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#c59332] hover:bg-[#b0822a] text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg shadow-[#c59332]/30 hover:scale-[1.03]"
              >
                Daftar PPDB
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/jurusan"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.03]"
              >
                Lihat Jurusan
              </a>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-5 w-[calc(100%+2rem)] -mx-4 md:w-full md:mx-0 mt-auto pb-4">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-2 sm:p-4 md:p-6 rounded-none sm:rounded-xl md:rounded-2xl flex flex-col justify-center transition-all duration-300 hover:bg-white/10 shadow-2xl shadow-black/20">
              <p className="text-[8px] sm:text-[11px] lg:text-xs font-bold tracking-widest text-[#c59332] uppercase mb-1 truncate">Program Keahlian</p>
              <p className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-1 md:mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent" data-count="4">0+</p>
              <p className="hidden md:block text-xs text-slate-300 leading-relaxed">Empat jurusan unggulan siap cetak tenaga ahli profesional.</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-2 sm:p-4 md:p-6 rounded-none sm:rounded-xl md:rounded-2xl flex flex-col justify-center transition-all duration-300 hover:bg-white/10 shadow-2xl shadow-black/20">
              <p className="text-[8px] sm:text-[11px] lg:text-xs font-bold tracking-widest text-[#c59332] uppercase mb-1 truncate">Mitra Industri</p>
              <p className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-1 md:mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent" data-count="20">0+</p>
              <p className="hidden md:block text-xs text-slate-300 leading-relaxed">Jaringan kerja sama luas dengan dunia usaha dan industri.</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-2 sm:p-4 md:p-6 rounded-none sm:rounded-xl md:rounded-2xl flex flex-col justify-center transition-all duration-300 hover:bg-white/10 shadow-2xl shadow-black/20">
              <p className="text-[8px] sm:text-[11px] lg:text-xs font-bold tracking-widest text-[#c59332] uppercase mb-1 truncate">Keterserapan</p>
              <p className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-1 md:mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent" data-count="95">0%</p>
              <p className="hidden md:block text-xs text-slate-300 leading-relaxed">Lulusan terserap kerja dan wirausaha dalam 6 bulan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Sambutan (Mobile) ─────────────────────────────────── */}
      <div className="lg:hidden p-8 bg-[#f4f3ef] border-t border-neutral-300 dark:border-neutral-800">
        <p className="text-[9px] font-bold tracking-widest text-[#b08128] uppercase">Kata Sambutan Pimpinan</p>
        <h2 className="text-2xl font-display font-extrabold text-slate-950 mt-1">Sambutan Kepala Sekolah</h2>
        <div className="text-sm text-slate-700 text-justify mt-4 space-y-3">
          <p><span className="italic">Bismillahirrohmanirrahim. Assalamu'alaikum Wr. Wb.</span></p>
          <p>Alhamdulillah, segala puji bagi Allah SWT atas karunia-Nya sehingga website resmi SMK Sulthan Baruna Cidaun, Cianjur ini dapat terus dikembangkan. Kami mengucapkan selamat datang kepada seluruh stakeholder, masyarakat, dan calon peserta didik baru.</p>
          <p>Di era globalisasi saat ini, website sekolah sangat penting sebagai sarana penyedia informasi yang riil dan transparan. Melalui platform ini, kami berkomitmen menampilkan profil sekolah, perkembangan kurikulum vokasi, serta jalinan kerja sama strategis bersama dunia industri (IDUKA) yang dapat diakses secara mudah.</p>
          <p>SMK Sulthan Baruna berkomitmen menyelenggarakan pendidikan kejuruan yang inovatif pada 4 Program Keahlian unggulan kami: APHP, MPLB, TKRO, dan TJKT. Kami mendidik setiap siswa agar tidak hanya unggul secara kompetensi teknis, tetapi juga tangguh menghadapi dinamika masa depan berlandaskan disiplin tinggi dan akhlak mulia. Mari terus bersinergi demi mencetak generasi emas vokasi yang kompeten dan siap kerja. <span className="italic">Wassalamu'alaikum Wr. Wb.</span></p>
        </div>
      </div>

      {/* ── Section 2: Sambutan + Program Keahlian (Desktop) ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen border-t lg:border-t-0 border-neutral-300 dark:border-neutral-800">
        {/* Left: sticky photo + speech */}
        <div className="hidden lg:block relative lg:sticky lg:top-0 h-screen overflow-hidden border-r border-neutral-300 dark:border-neutral-800">
          <img
            src="/images/section2.svg"
            alt="Drs. H. Sulthan Baruna"
            className="absolute inset-0 w-full h-full object-cover block opacity-100"
          />
          <div className="absolute top-10 lg:top-14 right-10 lg:right-16 w-[45%] text-left space-y-2 lg:space-y-3 z-10">
            <p className="text-[9px] lg:text-[11px] font-bold tracking-widest text-[#b08128] uppercase">Kata Sambutan Pimpinan</p>
            <h2 className="text-lg lg:text-xl xl:text-2xl font-display font-extrabold text-slate-950 mb-1 lg:mb-2">Sambutan Kepala Sekolah</h2>
            <div className="max-w-3xl w-full text-slate-800">
              <p className="text-[10px] xl:text-xs leading-relaxed text-slate-700 text-justify font-medium mb-3">
                <span className="italic">Bismillahirrohmanirrahim. Assalamu'alaikum Wr. Wb.</span> Alhamdulillah, segala puji bagi Allah SWT atas karunia-Nya sehingga website resmi SMK Sulthan Baruna Cidaun, Cianjur ini dapat terus dikembangkan. Kami mengucapkan selamat datang kepada seluruh stakeholder, masyarakat, dan calon peserta didik baru.
              </p>
              <p className="text-[10px] xl:text-xs leading-relaxed text-slate-700 text-justify font-medium mb-3">
                Di era globalisasi saat ini, website sekolah sangat penting sebagai sarana penyedia informasi yang riil dan transparan. Melalui platform ini, kami berkomitmen menampilkan profil sekolah, perkembangan kurikulum vokasi, serta jalinan kerja sama strategis bersama dunia industri (IDUKA) yang dapat diakses secara mudah.
              </p>
              <p className="text-[10px] xl:text-xs leading-relaxed text-slate-700 text-justify font-medium mb-3">
                SMK Sulthan Baruna berkomitmen menyelenggarakan pendidikan kejuruan yang inovatif pada 4 Program Keahlian unggulan kami: APHP, MPLB, TKRO, dan TJKT. Kami mendidik setiap siswa agar tidak hanya unggul secara kompetensi teknis, tetapi juga tangguh menghadapi dinamika masa depan berlandaskan disiplin tinggi dan akhlak mulia. Mari terus bersinergi demi mencetak generasi emas vokasi yang kompeten dan siap kerja. <span className="italic">Wassalamu'alaikum Wr. Wb.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: scrollable program blocks */}
        <div>
          {programs.map((p, idx) => (
            <div
              key={p.kode}
              className="min-h-screen flex flex-col justify-center p-12 lg:p-16 bg-[#f4f3ef] text-neutral-900 border-b border-neutral-300 dark:border-neutral-800"
            >
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">0{idx + 1} / {p.kode}</span>
              <h3 className="mt-3 font-display text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-tight">{p.nama}</h3>
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-xl">{p.desc}</p>
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-widest text-[#c59332] font-extrabold mb-3">Kompetensi Unggulan</h4>
                <ul className="space-y-2.5">
                  {p.competencies.map((c, i) => (
                    <li key={i} className="flex items-center text-sm text-neutral-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-[#c59332] rounded-full mr-3 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => router.visit('/jurusan')}
                className="mt-8 self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c59332] hover:text-[#b0822a] transition-all group"
              >
                Pelajari Kurikulum Jurusan
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Kemitraan Industri ───────────────────────────────── */}
      <section className="relative bg-[#fafaf8] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center text-[11px] font-bold tracking-widest text-[#c59332] uppercase mb-2">Mitra Industri & IDUKA</p>
          <h2 className="text-center font-display text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            Kemitraan & Penyelarasan Industri
          </h2>
          <p className="mt-2 text-center font-sans text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Bersama bersinergi meningkatkan mutu vokasi guna melahirkan lulusan berdaya saing global yang siap diserap industri nasional.
          </p>

          {/* Partner logos */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {Object.entries(partnershipData).map(([key, p]) => {
              const isActive = activePartner === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActivePartner(key);
                    if (detailRef.current) {
                      gsap.fromTo(detailRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
                    }
                  }}
                  className={`group relative flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#c59332] ${
                    isActive ? 'bg-white dark:bg-slate-900 shadow-md scale-105 ring-2 ring-[#c59332]/60' : 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105'
                  }`}
                >
                  {key === 'daihatsu' && <span className="font-display font-extrabold text-sm text-red-600 tracking-wider">DAIHATSU</span>}
                  {key === 'telkom' && <span className="font-display font-bold text-sm text-red-500">Telkom</span>}
                  {key === 'sariroti' && <span className="font-display font-extrabold text-sm text-amber-600 tracking-wide">SARI ROTI</span>}
                  {key === 'bri' && (
                    <div className="flex items-center gap-1.5">
                      <div className="bg-[#005088] text-white font-display font-black px-2 py-0.5 rounded text-xs tracking-tight">BRI</div>
                    </div>
                  )}
                  {key === 'indofood' && <span className="font-serif font-extrabold text-sm text-blue-800 dark:text-blue-400 tracking-tight">Indofood</span>}
                  <span className="text-[9px] font-medium text-slate-400 mt-1 whitespace-nowrap">{p.name}</span>
                  {isActive && <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c59332]" />}
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          {activePartner && partnershipData[activePartner] && (
            <div ref={detailRef} className="mt-10 mx-auto max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: partnershipData[activePartner].color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#c59332]/10 text-[#b08128]">
                      {partnershipData[activePartner].jurusan}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{partnershipData[activePartner].name}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {partnershipData[activePartner].program}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {partnershipData[activePartner].desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            Kolaborasi aktif bersama <span className="font-semibold text-[#005088]">5+ mitra industri nasional</span> untuk penyelarasan kurikulum dan penyerapan lulusan.
          </p>
        </div>
      </section>

      {/* ── Section 4: Kisah Sukses Alumni – Compact Grid ────────────────── */}
      <div className="mx-auto w-full max-w-6xl sm:px-6">
        <AlumniCarousel />
      </div>

      {/* ── Section 5: Berita & Agenda ───────────────────────────────────── */}
      <BeritaAgendaSection />
    </>
  );
}