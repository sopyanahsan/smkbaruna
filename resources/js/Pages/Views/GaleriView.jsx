import React from 'react';
import CoverflowCarousel from '@/Components/CoverflowCarousel';

export default function GaleriView() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="text-center font-bricolage">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Galeri Visual Sekolah
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
                Jelajahi momen dan kegiatan berharga di SMK Sulthan Baruna melalui galeri 3D interaktif kami.
            </p>
        </div>

        {/* Coverflow Carousel Component */}
        <div className="mt-12">
            <CoverflowCarousel />
        </div>
      </section>
    </div>
  );
}
