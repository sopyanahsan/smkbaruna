import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from '../../Components/Icons';

export default function KontakView() {
  const [form, setForm] = useState({
    nama: '',
    kontak: '',
    perihal: '',
    isi_pesan: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ success: false, loading: false, message: '' });

  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in & slide up section content
      gsap.fromTo(
        '.gsap-fade-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
      // Map entry animation
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = 'Nama wajib diisi';
    if (!form.kontak.trim()) {
      newErrors.kontak = 'Kontak (HP/Email) wajib diisi';
    } else if (form.kontak.length < 5) {
      newErrors.kontak = 'Kontak terlalu pendek';
    }
    if (!form.perihal.trim()) newErrors.perihal = 'Perihal wajib diisi';
    if (!form.isi_pesan.trim()) newErrors.isi_pesan = 'Isi pesan wajib diisi';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus({ success: false, loading: true, message: '' });

    // simulate sending request
    setTimeout(() => {
      setStatus({
        success: true,
        loading: false,
        message: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.'
      });
      setForm({ nama: '', kontak: '', perihal: '', isi_pesan: '' });
      setErrors({});

      // auto clear success message after 5s
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false, message: '' }));
      }, 5000);
    }, 1200);
  };

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      {/* Title Header */}
      <div className="gsap-fade-item text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Hubungi Kami
        </span>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Ada Pertanyaan? Kirim Pesan Cepat
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 dark:text-gray-400">
          Kami siap membantu Anda mendapatkan informasi lengkap tentang PPDB, kurikulum, dan kegiatan di SMK Sulthan Baruna.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid gap-10 lg:grid-cols-12 mb-16">
        {/* Left Column: Form */}
        <div className="gsap-fade-item lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-gray-900 sm:p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">
              Kirim Pesan
            </h3>

            {status.message && (
              <div className={`mb-6 p-4 rounded-xl text-sm ${
                status.success 
                  ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800' 
                  : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-gray-800 dark:text-white transition-all ${
                    errors.nama
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                />
                {errors.nama && (
                  <p className="mt-1 text-xs text-red-500">{errors.nama}</p>
                )}
              </div>

              <div>
                <label htmlFor="kontak" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  No. HP / Email / Whatsapp
                </label>
                <input
                  type="text"
                  name="kontak"
                  id="kontak"
                  value={form.kontak}
                  onChange={handleChange}
                  placeholder="Contoh: 0812xxxxxxxx atau nama@email.com"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-gray-800 dark:text-white transition-all ${
                    errors.kontak
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                />
                {errors.kontak && (
                  <p className="mt-1 text-xs text-red-500">{errors.kontak}</p>
                )}
              </div>

              <div>
                <label htmlFor="perihal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Perihal
                </label>
                <input
                  type="text"
                  name="perihal"
                  id="perihal"
                  value={form.perihal}
                  onChange={handleChange}
                  placeholder="Contoh: Info Pendaftaran PPDB"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-gray-800 dark:text-white transition-all ${
                    errors.perihal
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                />
                {errors.perihal && (
                  <p className="mt-1 text-xs text-red-500">{errors.perihal}</p>
                )}
              </div>

              <div>
                <label htmlFor="isi_pesan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Isi Pesan
                </label>
                <textarea
                  name="isi_pesan"
                  id="isi_pesan"
                  rows={4}
                  value={form.isi_pesan}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-gray-800 dark:text-white transition-all ${
                    errors.isi_pesan
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                />
                {errors.isi_pesan && (
                  <p className="mt-1 text-xs text-red-500">{errors.isi_pesan}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status.loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  'Kirim Pesan Cepat'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Contact Info Cards + Mini Map */}
        <div className="gsap-fade-item lg:col-span-5 flex flex-col gap-4">
          {/* Card Alamat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-gray-900 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Icon name="mappin" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                Alamat Sekolah
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                G773+4CX, Cisalak, Cidaun, Cianjur, Jawa Barat 43275
              </p>
            </div>
          </div>

          {/* Card WhatsApp */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-gray-900 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <Icon name="phone" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                WhatsApp Humas
              </h4>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                +62 812-3456-7890
              </a>
            </div>
          </div>

          {/* Card Email */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-gray-900 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Icon name="mail" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                Email Resmi
              </h4>
              <a
                href="mailto:info@smkbaruna.ac.id"
                className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                info@smkbaruna.ac.id
              </a>
            </div>
          </div>

          {/* Mini Google Maps */}
          <div ref={mapRef} className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
            <iframe
              title="Lokasi SMK Sulthan Baruna"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8017550057184!2d107.2510306747627!3d-7.487129492524914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e67d4fb3ee90bf1%3A0x7bc6fe75fbba959d!2sSMK%20Sulthan%20Baruna!5e0!3m2!1sen!2sid!4v1782871009918!5m2!1sen!2sid"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full transition-all duration-300 dark:invert-[90%] dark:hue-rotate-180 dark:grayscale"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}