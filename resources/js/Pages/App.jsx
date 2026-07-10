import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import MainLayout from '../Layouts/MainLayout';
import HomeView from './Views/HomeView';
import ProfilView from './Views/ProfilView';
import ProgramView from './Views/ProgramView';
import GaleriView from './Views/GaleriView';
import KontakView from './Views/KontakView';
import PPDBView from './Views/PPDBView';
import PortalView from './Views/PortalView';
import TentangView from './Views/TentangView';
import NewsView from './Views/NewsView';

export default function App({ page }) {
  const [currentPage, setCurrentPage] = useState(page);
  const [currentSubPage, setCurrentSubPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // sync with inertia prop changes
  useEffect(() => {
    setCurrentPage(page);
    setCurrentSubPage(null);
  }, [page]);

  // Loader animation on mount: fade in, hold, then fade out
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    tl.fromTo('.preloader-screen',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    .to({}, { duration: 1.5 })
    .to('.preloader-screen', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    });

    return () => tl.kill();
  }, []);

  const navigateTo = (page, subPage) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentPage(page);
    setCurrentSubPage(subPage);
    setIsTransitioning(false);
  };

      const renderView = () => {
        switch (currentPage) {
          case 'home':
            return <HomeView />;
          case 'profil':
            return <ProfilView />;
          case 'jurusan':
            return <ProgramView />;
          case 'galeri':
            return <GaleriView />;
          case 'kontak':
            return <KontakView />;
          case 'ppdb':
            return <PPDBView />;
          case 'portal':
            return <PortalView />;
          case 'tentang':
            return <TentangView subPage={currentSubPage || 'sejarah'} navigateTo={navigateTo} />;
          case 'news':
            return <NewsView />;
          default:
            return <HomeView />;
        }
      };

  // Title mapping for Head component
  const titleMap = {
    home: 'Beranda',
    profil: 'Profil',
    jurusan: 'Program Keahlian',
    galeri: 'Galeri',
    kontak: 'Kontak',
    ppdb: 'PPDB Online',
    portal: 'SIAKAD Portal',
    tentang: 'Tentang',
    news: 'News',
  };

  return (
    <>
      {isLoading && (
        <div className="preloader-screen fixed inset-0 z-50 flex flex-col justify-center items-center bg-white" style={{ opacity: 0 }}>
          <div className="loader"></div>
        </div>
      )}
      <MainLayout currentPage={currentPage} navigate={navigateTo}>
        <Head title={titleMap[currentPage] || 'SMK Baruna'} />
        <div>
          {renderView()}
        </div>
      </MainLayout>
    </>
  );
}
