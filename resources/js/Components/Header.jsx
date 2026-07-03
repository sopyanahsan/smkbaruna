import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';

const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang', href: '#', isDropdown: true },
    { label: 'Jurusan', href: '/jurusan' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Kontak', href: '/kontak' },
    { label: 'News', href: '/news' },
];

const tentangSubItems = [
    { key: 'prakata', label: 'Prakata Pimpinan' },
    { key: 'manajemen', label: 'Guru dan Tata Usaha' },
    { key: 'visi-misi', label: 'Visi & Misi' },
    { key: 'sejarah', label: 'Sejarah Sekolah' },
    { key: 'fasilitas', label: 'Fasilitas' },
];

const drawerMenuLinks = [
    { key: 'home', label: 'Beranda', href: '/' },
    { key: 'tentang', label: 'Tentang', isDropdown: true },
    { key: 'jurusan', label: 'Jurusan', href: '/jurusan' },
    { key: 'galeri', label: 'Galeri', href: '/galeri' },
    { key: 'kontak', label: 'Kontak', href: '/kontak' },
    { key: 'news', label: 'News', href: '/news' },
    { key: 'portal', label: 'Portal', href: '/portal' },
    { key: 'ppdb', label: 'PPDB', href: '/ppdb' },
];

export default function Header({ currentPage, navigate, isScrolled }) {
    const { url } = usePage();
    const [isTentangOpen, setIsTentangOpen] = useState(false);
    const [hoveredNavItem, setHoveredNavItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerTentangOpen, setDrawerTentangOpen] = useState(false);
    const [drawerHoveredItem, setDrawerHoveredItem] = useState(null);
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const headerRef = useRef(null);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsTentangOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Dark mode toggle
    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    // GSAP initial header entrance — clearProps so Tailwind classes can take over
    useEffect(() => {
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out', clearProps: 'transform,opacity' }
            );
        }
    }, []);

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isDrawerOpen]);

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    // --- Desktop header nav dimming logic ---
    const anyItemActive = hoveredNavItem !== null || isTentangOpen;
    const navItemClass = (name) => {
        const base = 'text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-300';
        const dim = 'opacity-30 blur-[0.5px]';
        const bright = 'opacity-100';
        if (!anyItemActive) return `${base} ${bright}`;
        if (hoveredNavItem === name) return `${base} ${bright}`;
        return `${base} ${dim}`;
    };

    const dropdownItemClass =
        'w-full text-left px-5 py-3 text-sm text-[#c59332] hover:bg-white/10 hover:text-[#dba44a] transition-colors';

    // --- Drawer sibling dimming logic ---
    const anyDrawerHovered = drawerHoveredItem !== null;
    const getDrawerItemClass = (itemKey) => {
        const base = 'text-2xl font-bold font-display tracking-wide transition-all duration-300 block py-3 text-white';
        if (!anyDrawerHovered) return `${base} opacity-100`;
        if (drawerHoveredItem === itemKey) return `${base} opacity-100`;
        return `${base} opacity-30 blur-[0.5px]`;
    };
    const getDrawerSubItemClass = (subKey) => {
        const base = 'text-base font-medium transition-all duration-300 block py-2 pl-5 text-[#c59332]';
        if (!anyDrawerHovered) return `${base} opacity-100`;
        if (drawerHoveredItem === subKey) return `${base} opacity-100`;
        return `${base} opacity-30 blur-[0.5px]`;
    };

    // Floating nav visible when scrolled OR drawer open
    const isFloatingVisible = isScrolled || isDrawerOpen;

    return (
        <>
            {/* ========== MAIN HEADER (TOPBAR) ========== */}
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
                    isScrolled
                        ? 'opacity-0 -translate-y-full pointer-events-none'
                        : 'opacity-100 translate-y-0 bg-gray-950/70 backdrop-blur-sm'
                }`}
            >
                <div className="mx-auto max-w-[1400px] flex h-16 items-center justify-between px-6 lg:px-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <img
                            src="/images/logosmk.webp"
                            alt="SMK Sulthan Baruna"
                            className="h-9 w-9 object-contain transition-transform group-hover:scale-105"
                        />
                        <span className="font-display text-base font-bold tracking-wide text-white">
                            SMK SULTHAN BARUNA
                        </span>
                    </Link>

                    {/* Right elements */}
                    <div className="flex items-center gap-8">
                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => {
                                if (link.isDropdown) {
                                    return (
                                        <div
                                            key="tentang-dropdown"
                                            className="relative"
                                            ref={dropdownRef}
                                            onMouseEnter={() => setHoveredNavItem('tentang')}
                                            onMouseLeave={() => setHoveredNavItem(null)}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setIsTentangOpen(!isTentangOpen)}
                                                className={`${navItemClass('tentang')} ${
                                                    currentPage === 'tentang' ? 'text-white' : 'text-gray-300 hover:text-white'
                                                }`}
                                            >
                                                Tentang
                                            </button>
                                            {isTentangOpen && (
                                                <div className="absolute top-full left-0 mt-3 min-w-[220px] rounded-lg shadow-2xl overflow-hidden z-50 bg-gray-900 border border-gray-700/50">
                                                    {tentangSubItems.map((item) => (
                                                        <button
                                                            key={item.key}
                                                            type="button"
                                                            onClick={() => {
                                                                navigate('tentang', item.key);
                                                                setIsTentangOpen(false);
                                                            }}
                                                            className={dropdownItemClass}
                                                        >
                                                            {item.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`${navItemClass(link.label.toLowerCase())} ${
                                            isActive(link.href) ? 'text-white' : 'text-gray-300 hover:text-white'
                                        }`}
                                        onMouseEnter={() => setHoveredNavItem(link.label.toLowerCase())}
                                        onMouseLeave={() => setHoveredNavItem(null)}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/portal"
                                className={`${navItemClass('portal')} text-gray-300 hover:text-white`}
                                onMouseEnter={() => setHoveredNavItem('portal')}
                                onMouseLeave={() => setHoveredNavItem(null)}
                            >
                                Portal
                            </Link>
                            <Link
                                href="/ppdb"
                                className={`${navItemClass('ppdb')} text-gray-300 hover:text-white`}
                                onMouseEnter={() => setHoveredNavItem('ppdb')}
                                onMouseLeave={() => setHoveredNavItem(null)}
                            >
                                PPDB
                            </Link>
                        </nav>

                        {/* Dark mode toggle - desktop */}
                        <button
                            onClick={() => setDark(!dark)}
                            className={`hidden lg:flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-white transition-all duration-300 ${
                                anyItemActive && hoveredNavItem !== 'dark' ? 'opacity-30 blur-[0.5px]' : 'opacity-100'
                            }`}
                            onMouseEnter={() => setHoveredNavItem('dark')}
                            onMouseLeave={() => setHoveredNavItem(null)}
                            aria-label="Toggle dark mode"
                        >
                            {dark ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                </svg>
                            )}
                        </button>

                        {/* Mobile burger (opens same drawer) */}
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-white transition-colors"
                            aria-label="Open menu"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* ========== FLOATING NAV BOX (pojok kanan atas) ========== */}
            <div
                className={`fixed top-0 right-0 z-50 flex items-center bg-black border-l border-b border-neutral-800 transition-all duration-500 ${
                    isFloatingVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
                }`}
            >
                {/* Logo button */}
                <Link
                    href="/"
                    className="flex items-center justify-center w-14 h-14 border-r border-neutral-800 hover:bg-neutral-900 transition-colors"
                    title="Beranda"
                >
                    <img src="/images/logosmk.webp" alt="SMK Sulthan Baruna" className="h-8 w-8 object-contain" />
                </Link>
                {/* Burger / single-line toggle */}
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className="flex flex-col items-center justify-center w-14 h-14 gap-[5px] hover:bg-neutral-900 transition-colors"
                    aria-label="Toggle drawer"
                >
                    <span className={`block h-[2px] bg-white transition-all duration-300 ${isDrawerOpen ? 'w-0 opacity-0' : 'w-5'}`} />
                    <span className={`block h-[2px] bg-white transition-all duration-300 w-5`} />
                    <span className={`block h-[2px] bg-white transition-all duration-300 ${isDrawerOpen ? 'w-0 opacity-0' : 'w-5'}`} />
                </button>
            </div>

            {/* ========== DRAWER OVERLAY ========== */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
                    isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsDrawerOpen(false)}
            />

            {/* ========== SLIDE-OUT SIDE DRAWER ========== */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-[300px] bg-[#111111] border-l border-neutral-900 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
                    isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* --- Top: Logo & Brand + Close --- */}
                <div className="flex h-20 items-center justify-between border-b border-neutral-800 py-8 pl-8 pr-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <img src="/images/logosmk.webp" alt="Logo" className="h-8 w-8 object-contain" />
                        <span className="font-display text-sm font-bold text-white tracking-wider">SMK SULTHAN BARUNA</span>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* --- Middle: Navigation List --- */}
                <nav
                    className="flex-1 overflow-y-auto pl-8 pr-4 py-10"
                    onMouseLeave={() => setDrawerHoveredItem(null)}
                >
                    {drawerMenuLinks.map((link) => {
                        if (link.isDropdown) {
                            return (
                                <div key={link.key}>
                                    <button
                                        type="button"
                                        onClick={() => setDrawerTentangOpen(!drawerTentangOpen)}
                                        onMouseEnter={() => setDrawerHoveredItem(link.key)}
                                        className={`${getDrawerItemClass(link.key)} w-full text-left flex items-center gap-2`}
                                    >
                                        Tentang
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={`w-5 h-5 transition-transform duration-300 ${drawerTentangOpen ? 'rotate-180' : ''}`}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${drawerTentangOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {tentangSubItems.map((sub) => (
                                            <button
                                                key={sub.key}
                                                type="button"
                                                onClick={() => {
                                                    navigate('tentang', sub.key);
                                                    setIsDrawerOpen(false);
                                                    setDrawerTentangOpen(false);
                                                }}
                                                onMouseEnter={() => setDrawerHoveredItem(sub.key)}
                                                className={getDrawerSubItemClass(sub.key)}
                                            >
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={link.key}
                                href={link.href}
                                onClick={() => setIsDrawerOpen(false)}
                                onMouseEnter={() => setDrawerHoveredItem(link.key)}
                                className={getDrawerItemClass(link.key)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    {/* Dark mode toggle inside drawer */}
                    <button
                        onClick={() => setDark(!dark)}
                        onMouseEnter={() => setDrawerHoveredItem('darkmode')}
                        className={`${getDrawerItemClass('darkmode')} flex items-center gap-3 mt-4 border-t border-neutral-800 pt-6`}
                    >
                        {dark ? (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                                <span className="text-base font-semibold">Light Mode</span>
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                </svg>
                                <span className="text-base font-semibold">Dark Mode</span>
                            </>
                        )}
                    </button>
                </nav>

                {/* --- Bottom: Ray Fan Pattern + Copyright --- */}
                <div className="relative h-44 shrink-0 border-t border-neutral-900 bg-black flex flex-col justify-center items-center px-6 overflow-hidden select-none">
                    {/* SVG Ray Fan Pattern */}
                    <svg
                        viewBox="0 0 100 100"
                        className="absolute bottom-0 w-full h-full text-neutral-900 stroke-current opacity-30 pointer-events-none"
                        strokeWidth="0.4"
                        preserveAspectRatio="none"
                    >
                        {Array.from({ length: 25 }).map((_, i) => {
                            const angle = (i * 180) / 24;
                            const rad = (angle * Math.PI) / 180;
                            const x2 = 50 + 50 * Math.cos(rad);
                            const y2 = 100 - 50 * Math.sin(rad);
                            return (
                                <line key={i} x1="50" y1="100" x2={x2} y2={y2} />
                            );
                        })}
                    </svg>
                    <div className="relative z-10 text-center">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">
                            &copy; {new Date().getFullYear()} SMK Sulthan Baruna
                        </p>
                        <p className="text-[10px] text-neutral-600 mt-1 tracking-wider">
                            Cidaun, Cianjur
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}