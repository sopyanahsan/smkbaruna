import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- DATA GURU & TATA USAHA (specific jabatan hierarchy) ---
const staffGroups = [
  {
    title: 'Kepala Sekolah',
    roleTag: 'KEPALA SEKOLAH',
    items: [
      {
        nama: 'Dra. Lilis Yuyun, M.M.Pd.',
        nip: '196705042000032010',
        jabatan: 'Kepala Sekolah',
        status: 'Aktif',
        agama: 'Islam',
        gender: 'Perempuan',
        foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Wakasek Kurikulum & Humas',
    roleTag: 'WAKASEK KURIKULUM & HUMAS',
    items: [
      {
        nama: 'Drs. H. Sulthan Baruna, M.Pd.',
        nip: '196508121990031002',
        jabatan: 'Wakasek Kurikulum & Humas',
        status: 'PNS / Aktif',
        agama: 'Islam',
        gender: 'Laki-laki',
        foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Kepala Program Keahlian TJKT',
    roleTag: 'KEPALA PROGRAM KEAHLIAN TJKT',
    items: [
      {
        nama: 'Zahra Amelia, S.T., M.Pd.',
        nip: '198504122010012015',
        jabatan: 'Kepala Program Keahlian TJKT',
        status: 'Aktif',
        agama: 'Islam',
        gender: 'Perempuan',
        foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Kepala Program Keahlian TKRO',
    roleTag: 'KEPALA PROGRAM KEAHLIAN TKRO',
    items: [
      {
        nama: 'Asep Ridwan, S.T.',
        nip: '198009182008011004',
        jabatan: 'Kepala Program Keahlian TKRO',
        status: 'Aktif',
        agama: 'Islam',
        gender: 'Laki-laki',
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Kepala Program Keahlian APHP',
    roleTag: 'KEPALA PROGRAM KEAHLIAN APHP',
    items: [
      {
        nama: 'H. Cecep Supriatna, S.Pd.',
        nip: '197511222005011003',
        jabatan: 'Kepala Program Keahlian APHP',
        status: 'Aktif',
        agama: 'Islam',
        gender: 'Laki-laki',
        foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Kepala Program Keahlian MPLB',
    roleTag: 'KEPALA PROGRAM KEAHLIAN MPLB',
    items: [
      {
        nama: 'Siti Aminah, S.E., M.Si.',
        nip: '198203042012012009',
        jabatan: 'Kepala Program Keahlian MPLB',
        status: 'Aktif',
        agama: 'Islam',
        gender: 'Perempuan',
        foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
];

// --- INLINE EXPANDABLE CREDENTIALS PANEL ---
function CredentialPanel({ person, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => ScrollTrigger.refresh(),
      }
    );
  }, []);

  return (
    <div
      ref={panelRef}
      className="col-span-1 bg-white/50 dark:bg-slate-800/30 rounded-r-[2rem] p-6 flex flex-col justify-center backdrop-blur-sm"
    >
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
          {person.nama}
        </h3>
        <p className="text-sm font-semibold text-[#c59332] mt-1 mb-5">
          {person.jabatan}
        </p>

        <hr className="border-slate-200/80 dark:border-slate-700/60 mb-5" />

        {/* Key-Value Details */}
        <div className="space-y-3.5 text-sm">
          {[
            { label: 'NIP', value: person.nip },
            { label: 'Status', value: person.status },
            { label: 'Agama', value: person.agama },
            { label: 'Gender', value: person.gender },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium w-16 shrink-0">{label}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">: {value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// --- STAFF CARD ---
function StaffCard({ person, index, isActive, onClick }) {
    const cardRef = useRef(null);
  
    useEffect(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, [index]);
  
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className={`group cursor-pointer relative bg-white dark:bg-slate-800 rounded-[2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-700/80 transition-all duration-500 ease-in-out ${
          isActive ? 'col-span-2 grid grid-cols-2 gap-4' : 'col-span-1 max-w-xs hover:shadow-lg'
        }`}
      >
        {/* Potrait Column */}
        <div className={isActive ? 'col-span-1' : ''}>
            <div className="aspect-[3/4] rounded-[1.75rem] overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-inner">
                <img
                    src={person.foto}
                    alt={person.nama}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
    
            <div className="flex justify-between items-start mt-4 pb-2 px-1">
                <div>
                    <h4 className={`text-base font-bold font-display leading-snug transition-colors line-clamp-2 ${isActive ? 'text-[#c59332]' : 'text-slate-900 dark:text-white group-hover:text-[#c59332]'}`}>
                        {person.nama}
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
                        {person.jabatan.toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
        
        {/* Credential Panel (appears when active) */}
        {isActive && <CredentialPanel person={person} onClose={onClick} />}
  
        {/* Premium Logo Button */}
        <button
          type="button"
          aria-label="Tampilkan detail"
          className={`absolute bottom-2 right-1.5 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 ${
            isActive 
              ? 'bg-[#c59332] rotate-45 scale-110' 
              : 'bg-slate-950 dark:bg-slate-900 hover:bg-slate-800'
          }`}
        >
          <img
            src="/images/logosmk.webp"
            alt="Logo SMK"
            className={`w-6 h-6 object-contain transition-all duration-300 ${
              isActive ? 'brightness-0 invert' : ''
            }`}
          />
        </button>
      </div>
    );
  }

// --- MAIN VIEW COMPONENT ---
export default function TentangView() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const [activeCard, setActiveCard] = useState(null);
    const gridRef = useRef(null);
  
    const handleCardClick = (nip) => {
      const newActiveCard = activeCard === nip ? null : nip;
      
      gsap.to(window, { duration: 0.4, scrollTo: { y: `#guru-${nip}`, offsetY: 120, autoKill: true }, ease: 'power2.inOut' });
  
      if (gridRef.current) {
        // Delay state update to allow layout animation
        setTimeout(() => {
          setActiveCard(newActiveCard);
          // Refresh ScrollTrigger after state update
          setTimeout(() => ScrollTrigger.refresh(), 100);
        }, 150);
      } else {
        setActiveCard(newActiveCard);
      }
    };
    
  
    useEffect(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
      gsap.fromTo(
        titleRef.current?.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.15 }
      );
    }, []);
  
    return (
        <section ref={sectionRef} className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div ref={titleRef} className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 bg-[#c59332]/10 text-[#c59332] text-xs font-bold uppercase tracking-[0.2em] rounded-full border border-[#c59332]/20 backdrop-blur-sm">
                Guru dan Tata Usaha
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#c59332] mt-6 font-display">
                Tenaga Pendidik & Kependidikan
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Didukung oleh guru dan staf berpengalaman yang berdedikasi tinggi untuk mencetak lulusan berkualitas dan siap kerja.
              </p>
            </div>
  
            {/* Hierarchy of Staff Sections */}
            <div className="space-y-20">
              {staffGroups.map((group) => (
                <div key={group.title}>
                  <div className="mb-8 px-4">
                    <div className="flex items-center gap-3">
                        <span className="border-b-2 border-[#c59332] pb-1 text-xs font-bold uppercase tracking-[0.15em] text-[#c59332] flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        </svg>
                        {group.roleTag}
                        </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white font-display mt-3">
                        {group.title}
                    </h3>
                    <hr className="mt-4 border-slate-200/60 dark:border-slate-700/60" />
                  </div>
  
                  {/* Grid Container for Cards */}
                  <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {group.items.map((person, index) => (
                      <div id={`guru-${person.nip}`} key={person.nip} className={`${activeCard === person.nip ? 'md:col-span-2' : 'col-span-1'}`}>
                          <StaffCard
                              person={person}
                              index={index}
                              isActive={activeCard === person.nip}
                              onClick={() => handleCardClick(person.nip)}
                          />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
  }
