import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Home() {
    return (
        <MainLayout>
            <Head title="Beranda" />
            <section className="p-8">
                <h1 className="text-4xl font-heading">Selamat Datang di SMK Sulthan Baruna</h1>
                <p className="mt-4 font-sans">
                    Hero section, statistik, dan highlight jurusan akan ditambahkan di sini.
                </p>
            </section>
        </MainLayout>
    );
}