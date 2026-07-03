import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const beritaItems = [
    {
        title: 'Kunjungan Industri ke PT Telkom Indonesia',
        date: '25 Juni 2026',
        category: 'Berita',
        excerpt: 'Siswa jurusan TJKT melaksanakan kunjungan industri ke kantor pusat PT Telkom Indonesia dalam rangka pengenalan dunia kerja.',
        image: null,
    },
    {
        title: 'Juara 1 LKS Tingkat Provinsi Jawa Barat',
        date: '18 Juni 2026',
        category: 'Berita',
        excerpt: 'Siswa SMK Sulthan Baruna meraih juara 1 Lomba Kompetensi Siswa bidang IT Networking tingkat Provinsi Jawa Barat.',
        image: null,
    },
    {
        title: 'Workshop Kewirausahaan Bersama Alumni',
        date: '10 Juni 2026',
        category: 'Berita',
        excerpt: 'Alumni sukses berbagi pengalaman dan tips membangun usaha mandiri kepada siswa kelas XII semua jurusan.',
        image: null,
    },
    {
        title: 'Pelatihan Sertifikasi BNSP untuk Guru',
        date: '5 Juni 2026',
        category: 'Berita',
        excerpt: 'Para guru produktif mengikuti pelatihan dan uji kompetensi sertifikasi BNSP untuk meningkatkan kualitas pengajaran.',
        image: null,
    },
];

const agendaItems = [
    { title: 'Ujian Akhir Semester Genap', date: '7–14 Juli 2026', type: 'Akademik' },
    { title: 'Penerimaan Rapor Semester Genap', date: '21 Juli 2026', type: 'Akademik' },
    { title: 'PPDB Gelombang 2 Tahun Ajaran 2026/2027', date: '1–15 Agustus 2026', type: 'Pendaftaran' },
    { title: 'Masa Pengenalan Lingkungan Sekolah (MPLS)', date: '18–20 Agustus 2026', type: 'Kegiatan' },
    { title: 'Upacara HUT Kemerdekaan RI ke-81', date: '17 Agustus 2026', type: 'Nasional' },
    { title: 'Prakerin Kelas XI Semester Ganjil', date: '1 September 2026', type: 'Akademik' },
];

export default function NewsView() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
        }
    }, []);

    return (
        <section className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto" ref={containerRef}>
            {/* Header */}
            <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 mb-3">
                    Informasi Terkini
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                    Berita & Agenda
                </h1>
                <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    Ikuti perkembangan terbaru kegiatan dan informasi penting SMK Sulthan Baruna.
                </p>
            </div>

            {/* Berita Grid */}
            <div className="mb-16">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                    Berita Terbaru
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {beritaItems.map((item, i) => (
                        <article
                            key={i}
                            className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                        >
                            {/* Placeholder image */}
                            <div className="h-40 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950 dark:to-violet-950 flex items-center justify-center">
                                <span className="text-4xl">📰</span>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">
                                        {item.category}
                                    </span>
                                    <span className="text-[10px] text-gray-400">{item.date}</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                                    {item.excerpt}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Agenda Table */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-violet-600 rounded-full"></span>
                    Agenda Mendatang
                </h2>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                                <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Kegiatan</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Tanggal</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">Kategori</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendaItems.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-t border-gray-100 dark:border-gray-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors"
                                >
                                    <td className="px-5 py-3.5 font-medium text-gray-800 dark:text-gray-200">
                                        {item.title}
                                        <span className="block sm:hidden text-xs text-gray-400 mt-0.5">{item.date}</span>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{item.date}</td>
                                    <td className="px-5 py-3.5 hidden md:table-cell">
                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                                            {item.type}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}