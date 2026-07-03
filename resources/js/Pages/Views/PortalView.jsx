import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// Mock data siswa & guru
const MOCK_SISWA = {
    nama: 'Ahmad Fauzan Ramdhani',
    nisn: '0012345678',
    kelas: 'XII TJKT 1',
    jurusan: 'Teknik Jaringan Komputer & Telekomunikasi',
    foto: null,
};

const MOCK_GURU = {
    nama: 'Hj. Siti Nurhaliza, S.Pd., M.Pd.',
    nip: '198507142010012003',
    mapel: 'Bahasa Indonesia',
    jabatan: 'Guru Mata Pelajaran',
    foto: null,
};

// Menu grid items
const MENU_SISWA = [
    { icon: '📊', label: 'Kartu Hasil Studi (KHS)', desc: 'Lihat nilai rapor semester' },
    { icon: '📅', label: 'Jadwal Pelajaran', desc: 'Jadwal mingguan kelas' },
    { icon: '📝', label: 'Tugas & Ujian', desc: 'Daftar tugas & ujian aktif' },
    { icon: '💳', label: 'Status SPP / Keuangan', desc: 'Riwayat pembayaran SPP' },
];

const MENU_GURU = [
    { icon: '✍️', label: 'Input Nilai Rapor', desc: 'Input & kelola nilai siswa' },
    { icon: '👥', label: 'Presensi Kelas', desc: 'Rekap kehadiran siswa' },
    { icon: '📚', label: 'Kelola Materi Tugas', desc: 'Upload materi & tugas' },
    { icon: '💼', label: 'Agenda Rapat', desc: 'Jadwal rapat & notulensi' },
];

export default function PortalView() {
    const [role, setRole] = useState('siswa'); // 'siswa' | 'guru'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const containerRef = useRef(null);
    const formRef = useRef(null);
    const dashRef = useRef(null);

    // Animate on mount
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        }
    }, []);

    // Animate form/dashboard swap
    useEffect(() => {
        const target = isLoggedIn ? dashRef.current : formRef.current;
        if (target) {
            gsap.fromTo(target, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        }
    }, [isLoggedIn]);

    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();
        if (!identifier.trim() || !password.trim()) {
            setError('Semua field wajib diisi.');
            return;
        }
        // ponytail: no real auth — simulasi only, add backend validation when API ready
        setError('');
        setIsLoggedIn(true);
    };

    // Handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIdentifier('');
        setPassword('');
        setError('');
    };

    // Reset fields on role switch
    const switchRole = (newRole) => {
        if (newRole === role) return;
        setRole(newRole);
        setIdentifier('');
        setPassword('');
        setError('');
    };

    const profile = role === 'siswa' ? MOCK_SISWA : MOCK_GURU;
    const menus = role === 'siswa' ? MENU_SISWA : MENU_GURU;

    return (
        <section ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Portal SIAKAD
                    </h1>
                    <p className="text-gray-500 font-body text-sm md:text-base">
                        Sistem Informasi Akademik — SMK Sulthan Baruna
                    </p>
                </div>

                {!isLoggedIn ? (
                    /* ====== LOGIN FORM ====== */
                    <div ref={formRef} className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Tab Selector */}
                            <div className="flex border-b border-gray-100">
                                <button
                                    onClick={() => switchRole('siswa')}
                                    className={`flex-1 py-3.5 text-sm font-semibold font-body transition-colors duration-200 ${
                                        role === 'siswa'
                                            ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    👨‍🎓 Siswa
                                </button>
                                <button
                                    onClick={() => switchRole('guru')}
                                    className={`flex-1 py-3.5 text-sm font-semibold font-body transition-colors duration-200 ${
                                        role === 'guru'
                                            ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    👩‍🏫 Guru / Staf
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-body">
                                        {role === 'siswa' ? 'NISN (Nomor Induk Siswa Nasional)' : 'NIP / ID Pendidik'}
                                    </label>
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder={role === 'siswa' ? 'Masukkan NISN...' : 'Masukkan NIP...'}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-body">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Masukkan password..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs font-body">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm font-body transition-colors duration-200 shadow-md shadow-blue-200"
                                >
                                    Masuk Aplikasi Portal
                                </button>

                                <p className="text-center text-xs text-gray-400 font-body">
                                    Hubungi admin sekolah jika lupa kredensial.
                                </p>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* ====== DASHBOARD ====== */
                    <div ref={dashRef}>
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                                        {profile.nama.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="font-heading text-lg font-bold text-gray-900">{profile.nama}</h2>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500 font-body">
                                            <span>
                                                {role === 'siswa' ? `NISN: ${profile.nisn}` : `NIP: ${profile.nip}`}
                                            </span>
                                            <span>
                                                {role === 'siswa' ? `Kelas: ${profile.kelas}` : `Mapel: ${profile.mapel}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold font-body transition-colors"
                                >
                                    Keluar ↗
                                </button>
                            </div>
                        </div>

                        {/* Menu Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {menus.map((item, i) => (
                                <MenuCard key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

// Animated menu card
function MenuCard({ item, index }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.1 * index, ease: 'power2.out' });
        }
    }, [index]);

    return (
        <div
            ref={ref}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-5 cursor-pointer transition-shadow duration-200 group"
        >
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <h3 className="font-heading text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {item.label}
            </h3>
            <p className="text-xs text-gray-400 font-body mt-1">{item.desc}</p>
        </div>
    );
}