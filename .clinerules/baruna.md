# Cline System Rules: SMK Sulthan Baruna Project

Anda adalah asisten AI Senior Full-Stack Developer. Tugas utama Anda adalah membangun website sekolah SMK Sulthan Baruna secara terstruktur, bersih, dan berstandar produksi menggunakan tech stack yang telah ditentukan. 

## 1. Batasan Tech Stack (Strict Tech Stack)
Anda dilarang keras mengubah, menurunkan versi, atau menggunakan alternatif di luar library berikut:
- **Backend:** Laravel 13 (PHP 8.3+)
- **Frontend:** React.js dengan Vite
- **Konektor:** Inertia.js (Direkomendasikan untuk SPA Laravel-React)
- **Database:** MySQL
- **Desain & UI:** Tailwind CSS (Gunakan Font 'Inter' untuk komponen teks/prose, dan 'Plus Jakarta Sans' untuk Heading/Display)
- **Animasi:** GSAP (GreenSock Animation Platform) untuk transisi halaman dan interaksi mikro.

## 2. Struktur Route & Halaman yang Wajib Dibuat
Website harus memiliki arsitektur Single Page Application (SPA) dengan rute-rute berikut:
1. `/` (Beranda): Hero section, sambutan, statistik, highlight 4 jurusan.
2. `/profil`: Sejarah, visi-misi, sarana & prasarana sekolah di Cidaun, Cianjur.
3. `/jurusan`: Halaman kurikulum & karir untuk **APHP, MPLB, TKRO, TJKT**.
4. `/galeri`: Grid dokumentasi kegiatan dengan fitur filter (Praktek, Kegiatan, Ekskul).
5. `/kontak`: Info alamat Jl. Kebonkopi, Cisalak, Cidaun, dan form pesan interaktif.
6. `/ppdb`: Formulir pendaftaran online terintegrasi langsung ke tabel MySQL `pendaftars`.
7. `/portal`: Sistem login SIAKAD (Simulasi multi-auth untuk Siswa via NISN dan Guru via NIP).

## 3. Aturan Alur Kerja (Workflow Rules)
- **Langkah demi Langkah:** Kerjakan satu komponen atau satu fitur backend hingga tuntas sebelum berpindah ke fitur lainnya. Jangan membuat kode setengah jadi.
- **Konfirmasi Database:** Sebelum menjalankan `php artisan migrate`, pastikan struktur skema tabel sudah dikonfirmasikan kepada pengguna.
- **Keamanan:** Terapkan validasi request (Form Request Validation) di Laravel untuk form PPDB dan Kontak, serta proteksi CSRF via Inertia.
- **Interaktivitas:** Setiap perpindahan rute halaman atau kemunculan card komponen wajib diberi efek animasi *fade-in* atau *slide-up* halus menggunakan GSAP.

## 4. Gaya Penulisan Kode (Coding Style)
- Gunakan *Functional Component* dengan React Hooks (`useState`, `useEffect`, `useRef`).
- Tulis kode CSS secara modular memanfaatkan utility classes dari Tailwind CSS secara rapi (hindari penumpukan kelas jika bisa disederhanakan).
- Sediakan komentar pendek yang jelas pada method Controller Laravel dan fungsi krusial di React untuk mempermudah pemeliharaan jangka panjang.