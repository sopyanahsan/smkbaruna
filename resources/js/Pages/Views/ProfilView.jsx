import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const sejarah = `Didirikan pada tahun 2019, SMK Sulthan Baruna berlokasi di Cidaun, Cianjur. 
Mengusung visi menjadi pusat keunggulan pendidikan vokasi di wilayah Jawa Barat, 
sekolah ini telah melahirkan ribuan lulusan terampil yang berkontribusi pada industri lokal. 
Dengan dedikasi tinggi dari segenap civitas akademika, kami terus berinovasi dalam mengintegrasikan kurikulum industri dengan pendidikan karakter guna membentuk generasi unggul.`;

const visi = `Menjadi lembaga pendidikan vokasi terdepan yang menghasilkan lulusan 
berkarakter, kompeten, dan inovatif, berdaya saing tinggi baik di pasar kerja nasional 
maupun internasional.`;

const misi = [
  'Menyelenggarakan pendidikan berkualitas sesuai kurikulum nasional dan kebutuhan industri.',
  'Mengembangkan program keahlian sesuai tren teknologi dan pasar kerja.',
  'Menciptakan lingkungan belajar yang kondusif, aman, dan berbudaya.',
  'Meningkatkan kerja sama dengan dunia usaha, industri, dan perguruan tinggi.'
];

const tujuan = [
  'Membekali siswa dengan kompetensi keahlian standar industri global.',
  'Menumbuhkan jiwa wirausaha (entrepreneurship) yang mandiri dan kreatif.',
  'Mewujudkan fasilitas sarana prasarana praktek yang mutakhir.',
  'Menyalurkan lulusan ke dunia kerja melalui bursa kerja khusus (BKK) yang aktif.'
];

const struktur = [
  {
    name: 'Drs. H. Sulthan Baruna',
    jabatan: 'Kepala Sekolah',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Wakasek Kurikulum',
    jabatan: 'Wakil Kepala Sekolah Bidang Kurikulum',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Kaprog TJKT',
    jabatan: 'Kepala Program Teknik Jaringan Komputer & Telekomunikasi',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Kaprog TKRO',
    jabatan: 'Kepala Program Teknik Kendaraan Ringan Otomotif',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
  }
];

const fasilitas = [
  {
    name: 'Lab Cisco TJKT',
    foto: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    desc: 'Laboratorium jaringan Cisco lengkap untuk praktik TJKT.'
  },
  {
    name: 'Bengkel Kerja Utama (TKRO)',
    foto: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop',
    desc: 'Fasilitas bengkel lengkap untuk pelatihan otomotif.'
  },
  {
    name: 'Dapur Praktek Pengolahan Pangan (APHP)',
    foto: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop',
    desc: 'Dapur modern untuk praktik kuliner dan agroindustri.'
  },
  {
    name: 'Ruang Simulasi Perkantoran (MPLB)',
    foto: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop',
    desc: 'Simulasi perkantoran lengkap untuk program MPLB.'
  }
];

const tabs = [
  { id: 'sejarah', label: 'Sejarah & Identitas' },
  { id: 'visi', label: 'Visi & Misi' },
  { id: 'struktur', label: 'Struktur Organisasi' },
  { id: 'fasilitas', label: 'Fasilitas Unggulan' }
];

export default function ProfilView() {
  const [activeTab, setActiveTab] = useState('sejarah');
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'sejarah':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Sejarah Singkat & Identitas
              </h2>
              <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-base sm:text-lg">
                {sejarah}
              </p>
              <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-base">
                SMK Sulthan Baruna berdedikasi tinggi memberikan sarana praktek terbaik demi melahirkan bibit-bibit unggul siap kerja. Kami menjunjung tinggi integritas, kerja keras, dan kedisiplinan yang berfokus pada kesejahteraan masa depan taruna dan taruni kami.
              </p>
            </div>
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
                alt="Gedung Utama SMK Sulthan Baruna"
                className="object-cover rounded-2xl shadow-md w-full h-64 sm:h-80"
              />
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm">
                <table className="w-full text-left border-collapse text-sm text-slate-600 dark:text-slate-350">
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80">
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 w-1/3">NPSN</th>
                      <td className="px-4 py-3 font-mono">69978120</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80">
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">SK Pendirian</th>
                      <td className="px-4 py-3">SK No. 123/2020</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80">
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">Akreditasi</th>
                      <td className="px-4 py-3 font-bold text-indigo-650 dark:text-indigo-400">A</td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">Alamat Resmi</th>
                      <td className="px-4 py-3">Jl. Kebonkopi, Cisalak, Cidaun, Cianjur</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'visi':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Visi Sekolah
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-350 leading-relaxed text-base sm:text-lg italic border-l-4 border-indigo-500 pl-4">
                  "{visi}"
                </p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Misi Sekolah
                </h3>
                <ul className="mt-3 space-y-2.5 text-slate-600 dark:text-slate-350">
                  {misi.map((item, idx) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-xs font-bold text-indigo-650 dark:text-indigo-400">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Tujuan Strategis
                </h3>
                <ul className="mt-3 space-y-2.5 text-slate-600 dark:text-slate-350">
                  {tujuan.map((item, idx) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base">
                      <span className="flex h-2 w-2 shrink-0 rounded-full bg-indigo-500 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
                alt="Atmosfer Belajar Mengajar SMK Sulthan Baruna"
                className="object-cover rounded-2xl shadow-md w-full h-64 sm:h-96 lg:h-[500px]"
              />
            </div>
          </div>
        );
      case 'struktur':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Struktur Organisasi & Tenaga Pendidik
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-350">
                Pilar penggerak pendidikan vokasi unggulan di bawah naungan Yayasan Sulthan Baruna.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {struktur.map(person => (
                <div
                  key={person.name}
                  className="flex flex-col items-center text-center rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/50 shadow-sm transition-transform hover:-translate-y-1 duration-300"
                >
                  <img
                    src={person.foto}
                    alt={person.name}
                    className="object-cover rounded-2xl shadow-md w-32 h-32 mb-4 ring-4 ring-slate-100 dark:ring-slate-800"
                  />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight">
                    {person.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-650 dark:text-indigo-400 mt-1">
                    {person.jabatan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'fasilitas':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Fasilitas Unggulan & Ruang Praktik
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-350">
                Guna menunjang kompetensi industri nyata, kami menyediakan laboratorium serta bengkel kerja berstandar tinggi.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {fasilitas.map(item => (
                <div
                  key={item.name}
                  className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={item.foto}
                      alt={item.name}
                      className="object-cover rounded-t-2xl shadow-md w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex-grow">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
      {/* Sub-navigation Menu (Flat Buttons) */}
      <nav className="flex flex-wrap gap-3 items-center justify-start pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-250 cursor-pointer
              ${activeTab === tab.id
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'}
              focus:outline-none focus:ring-2 focus:ring-indigo-550
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area with GSAP Animation Wrapper */}
      <div ref={contentRef}>
        {renderContent()}
      </div>
    </div>
  );
}