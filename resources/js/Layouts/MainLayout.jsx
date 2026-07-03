import React from 'react';
import Header from '../Components/Header';
import { useState, useEffect } from 'react';
import Footer from '../Components/Footer';

export default function MainLayout({ children, currentPage, navigate }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Header currentPage={currentPage} navigate={navigate} isScrolled={isScrolled} />
<main>{children}</main>
            <Footer />
        </div>
    );
}