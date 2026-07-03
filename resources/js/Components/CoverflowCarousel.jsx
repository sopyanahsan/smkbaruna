import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ASSETS = [
  {
    src: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
    title: 'Praktek Laboratorium TJKT',
    description: 'Siswa melakukan instalasi jaringan fiber optik dan konfigurasi router mikrotik di lab komputer.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    title: 'Simulasi Rapat MPLB',
    description: 'Praktek manajemen perkantoran dan layanan bisnis menggunakan ruang meeting standar industri.',
  },
  {
    src: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800&auto=format&fit=crop',
    title: 'Uji Kompetensi Otomotif TKRO',
    description: 'Pemeriksaan sistem kelistrikan dan tune-up mesin EFI pada mobil praktek.',
  },
  {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    title: 'Praktek Pengolahan Hasil APHP',
    description: 'Proses sterilisasi dan pengemasan produk minuman herbal hasil pertanian sekolah.',
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    title: 'Kunjungan Industri BUMN',
    description: 'Orientasi lapangan siswa tingkat akhir di PT Pindad untuk pengenalan etos kerja industri.',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    title: 'Kerja Kelompok & Diskusi',
    description: 'Kolaborasi antar jurusan dalam merancang proyek kreatif tahunan sekolah.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    title: 'Presentasi Project Work',
    description: 'Siswa mempresentasikan hasil aplikasi IoT di depan dewan penguji industri.',
  },
  {
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    title: 'Kegiatan Ekstrakurikuler Robotik',
    description: 'Perakitan robot line follower untuk persiapan kompetisi tingkat provinsi.',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    title: 'Seminar Industri Digital',
    description: 'Kuliah umum bersama praktisi teknologi membahas tren AI dan Cloud Computing.',
  },
  {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    title: 'Upacara Pelepasan Lulusan',
    description: 'Prosesi wisuda dan penyerahan sertifikat kompetensi keahlian BNSP.',
  },
]

export default function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(ASSETS.length / 2));
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const get3DStyles = (index) => {
    const N = ASSETS.length;
    // Circular offset calculation
    let offset = (index - activeIndex + N / 2) % N - N / 2;
    
    const isDesktop = windowWidth >= 768;
    const spacing = isDesktop ? 190 : 130;
    
    const translateX = offset * spacing;
    
    let rotateY = 0;
    if (offset < 0) rotateY = 42;
    else if (offset > 0) rotateY = -42;

    const scale = Math.abs(offset) < 0.5 ? 1.05 : 0.75;
    const zIndex = 100 - Math.floor(Math.abs(offset));
    const opacity = Math.abs(offset) > 3 ? 0 : 1;

    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  const toPrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : ASSETS.length - 1));
  };

  const toNext = () => {
    setActiveIndex(prev => (prev < ASSETS.length - 1 ? prev + 1 : 0));
  };

  const toSlide = (index) => {
    setActiveIndex(index);
  };
  
  const activeItem = ASSETS[activeIndex];

  return (
    <div className="w-full flex flex-col items-center select-none bg-transparent py-10 overflow-hidden">
      {/* 3D Carousel Container */}
      <div 
        className="relative w-full h-[260px] md:h-[380px] flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {ASSETS.map((item, i) => (
          <motion.div
            key={item.title}
            className="absolute w-48 md:w-72 h-full cursor-pointer will-change-transform"
            style={{ transformOrigin: 'center center' }}
            onClick={() => toSlide(i)}
            animate={get3DStyles(i)}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          >
            <img 
              src={item.src} 
              alt={item.title} 
              className="w-full h-full object-cover rounded-2xl shadow-xl border border-white/10" 
            />
            {/* Soft dark overlay for inactive cards to emphasize the center card */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 rounded-2xl ${activeIndex === i ? 'opacity-0' : 'opacity-20'}`} />
          </motion.div>
        ))}
      </div>

      {/* Centered Text Info Section */}
      <div className="relative w-full max-w-2xl text-center min-h-[100px] mt-8 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-bricolage tracking-tight">
              {activeItem.title}
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto font-sans leading-relaxed">
              {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Controls Bar */}
      <div className="mt-6 flex items-center justify-center gap-4 py-2 px-4 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <button 
          onClick={toPrev} 
          className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Slide dots */}
        <div className="flex items-center gap-2 px-2">
          {ASSETS.map((_, i) => (
            <div
              key={i}
              onClick={() => toSlide(i)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeIndex === i 
                  ? 'w-6 bg-[#c59332]' 
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={toNext} 
          className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}