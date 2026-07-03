import React from 'react';
import { Icon } from '../../Components/Icons';

const programs = [
  {
    kode: 'APHP',
    nama: 'Agribisnis Pengolahan Hasil Pertanian',
    kurikulum: [
      'Pengantar Agribisnis',
      'Teknologi Pengolahan Hasil Pertanian',
      'Manajemen Agroindustri',
      'Praktik Kerja Lapangan (PKL) di Kebun & Pabrik',
    ],
    karir: ['Analis Agroindustri', 'Manajer Produksi', 'Pengusaha Agro']
  },
  {
    kode: 'MPLB',
    nama: 'Manajemen Perkantoran & Layanan Bisnis',
    kurikulum: [
      'Administrasi Perkantoran',
      'Komunikasi Bisnis',
      'Manajemen Operasional',
      'Etika & Hukum Bisnis'
    ],
    karir: ['Office Manager', 'Admin Senior', 'Spesialis Layanan Pelanggan']
  },
  {
    kode: 'TKRO',
    nama: 'Teknik Kendaraan Ringan Otomotif',
    kurikulum: [
      'Dasar-dasar Otomotif',
      'Perbaikan Mesin Kendaraan Ringan',
      'Diagnostik Elektronik',
      'Manajemen Bengkel'
    ],
    karir: ['Mekanik Otomotif', 'Teknisi Service', 'Supervisor Produksi']
  },
  {
    kode: 'TJKT',
    nama: 'Teknik Jaringan Komputer & Telekomunikasi',
    kurikulum: [
      'Fundamentals Networking',
      'Instalasi & Konfigurasi Jaringan',
      'Keamanan Siber',
      'Cloud & Virtualization'
    ],
    karir: ['Network Engineer', 'System Administrator', 'IT Support Specialist']
  }
];

export default function ProgramView() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white text-center">
        Program Keahlian
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
        Detail kurikulum dan prospek karir bagi empat jurusan unggulan
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {programs.map(p => (
          <div
            key={p.kode}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{p.kode} - {p.nama}</h3>

            <div className="mt-4">
              <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Kurikulum</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                {p.kurikulum.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Prospek Karir</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                {p.karir.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}