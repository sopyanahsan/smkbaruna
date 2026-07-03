import React from 'react';

// ponytail: SVG logos are placeholders — replace with real assets when available
function LogoKemendikbud() {
    return (
        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="16" cy="10" r="6" />
            <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            <path d="M16 2l2 4h-4l2-4z" />
        </svg>
    );
}

function LogoCianjur() {
    return (
        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" viewBox="0 0 32 32" fill="currentColor">
            <rect x="6" y="12" width="20" height="16" rx="2" />
            <polygon points="16,2 4,14 28,14" />
        </svg>
    );
}

function LogoBNSP() {
    return (
        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" viewBox="0 0 32 32" fill="currentColor">
            <rect x="4" y="4" width="24" height="24" rx="4" />
            <text x="16" y="22" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">B</text>
        </svg>
    );
}

const linkColumns = [
    {
        title: 'Program Keahlian',
        links: [
            { label: 'APHP', href: '/jurusan#aphp' },
            { label: 'MPLB', href: '/jurusan#mplb' },
            { label: 'TKRO', href: '/jurusan#tkro' },
            { label: 'TJKT', href: '/jurusan#tjkt' },
        ],
    },
    {
        title: 'Layanan Akademik',
        links: [
            { label: 'SIAKAD', href: '/portal' },
            { label: 'E-Learning', href: '#' },
            { label: 'Kalender Akademik', href: '#' },
            { label: 'Perpustakaan Digital', href: '#' },
        ],
    },
    {
        title: 'Hubungan Industri',
        links: [
            { label: 'Bursa Kerja Khusus (BKK)', href: '#' },
            { label: 'Info Magang', href: '#' },
            { label: 'Kemitraan IDUKA', href: '#' },
            { label: 'Tracer Study Alumni', href: '#' },
        ],
    },
];

const bottomLinks = [
    { label: 'Tentang Sekolah', href: '/profil' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Peta Situs', href: '#' },
];

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
            {/* Top section: columns + partner logos */}
            <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                    {/* Link columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
                        {linkColumns.map((col) => (
                            <div key={col.title}>
                                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                                    {col.title}
                                </h4>
                                <ul className="space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-violet-400 transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Partner logos — top right */}
                    <div className="flex items-start gap-4 lg:pl-8">
                        <LogoKemendikbud />
                        <LogoCianjur />
                        <LogoBNSP />
                    </div>
                </div>
            </div>

            {/* Bottom section: branding + horizontal links */}
            <div className="border-t border-slate-200 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Bottom-left: branding & legalitas */}
                    <div className="flex items-center gap-3">
                        <img 
                            src="/images/logosmk.webp" 
                            alt="SMK Sulthan Baruna Logo" 
                            className="h-10 w-10 object-contain"
                        />
                        <div>
                            <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                SMK SULTHAN BARUNA
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 max-w-md">
                                Pendidikan vokasi terakreditasi nasional di bawah binaan Dinas Pendidikan Provinsi Jawa Barat. NPSN: 69978120.
                            </p>
                        </div>
                    </div>

                    {/* Bottom-right: horizontal mandatory links */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        {bottomLinks.map((link, i) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-violet-400 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}