import React, { useState } from 'react';
import axios from 'axios';

const programs = [
  { value: 'APHP', label: 'APHP - Agribisnis Pengolahan Hasil Pertanian' },
  { value: 'MPLB', label: 'MPLB - Manajemen Perkantoran & Layanan Bisnis' },
  { value: 'TKRO', label: 'TKRO - Teknik Kendaraan Ringan Otomotif' },
  { value: 'TJKT', label: 'TJKT - Teknik Jaringan Komputer & Telekomunikasi' },
];

export default function PPDBView() {
const [form, setForm] = useState({
    nama: '',
    nik: '',
    ttl: '',
    alamat: '',
    whatsapp: '',
    program: '',
    jenisKelamin: '',
    namaOrangTua: '',
});

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [dbSimulated, setDbSimulated] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
if (!/^\d{16}$/.test(form.nik)) {
  newErrors.nik = 'NIK harus berupa 16 digit angka.';
}
if (!form.nama.trim()) {
  newErrors.nama = 'Nama lengkap wajib diisi.';
}
if (!form.ttl) {
  newErrors.ttl = 'Tanggal lahir wajib diisi.';
}
if (!form.alamat.trim()) {
  newErrors.alamat = 'Alamat wajib diisi.';
}
if (!/^\+?[0-9]{10,15}$/.test(form.whatsapp)) {
  newErrors.whatsapp = 'Nomor WhatsApp tidak valid (10-15 digit).';
}
if (!form.program) {
  newErrors.program = 'Pilih salah satu jurusan.';
}
if (!form.jenisKelamin) {
  newErrors.jenisKelamin = 'Pilih jenis kelamin.';
}
if (!form.namaOrangTua.trim()) {
  newErrors.namaOrangTua = 'Nama orang tua wajib diisi.';
}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Prepare payload matching Laravel expectations
const payload = {
  namaLengkap: form.nama,
  nik: form.nik,
  tanggalLahir: form.ttl,
  jenisKelamin: form.jenisKelamin,
  namaOrangTua: form.namaOrangTua,
  alamatLengkap: form.alamat,
  noWhatsapp: form.whatsapp,
  pilihanJurusan: form.program,
};

    try {
      const response = await axios.post('/api/ppdb', payload);
      const saved = response.data.data;

      // Update realtime log with saved MySQL record
      setDbSimulated(prev => [
        {
          id: saved.id,
          created_at: new Date(saved.created_at).toLocaleTimeString(),
          nama: saved.nama_lengkap,
          program: saved.pilihan_jurusan,
        },
        ...prev,
      ]);

      // Set submitted data to show digital proof
      setSubmittedData(saved);
      setFormSubmitted(true);
      setSent(true);

      // Reset form
setForm({
  nama: '',
  nik: '',
  ttl: '',
  alamat: '',
  whatsapp: '',
  program: '',
  jenisKelamin: '',
  namaOrangTua: '',
});
      setErrors({});
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const backendErrors = err.response.data.errors;
        const mappedErrors = {};
        if (backendErrors.namaLengkap) mappedErrors.nama = backendErrors.namaLengkap[0];
        if (backendErrors.nik) mappedErrors.nik = backendErrors.nik[0];
        if (backendErrors.tanggalLahir) mappedErrors.ttl = backendErrors.tanggalLahir[0];
        if (backendErrors.alamatLengkap) mappedErrors.alamat = backendErrors.alamatLengkap[0];
        if (backendErrors.noWhatsapp) mappedErrors.whatsapp = backendErrors.noWhatsapp[0];
        if (backendErrors.pilihanJurusan) mappedErrors.program = backendErrors.pilihanJurusan[0];
        if (backendErrors.jenisKelamin) mappedErrors.jenisKelamin = backendErrors.jenisKelamin[0];
        if (backendErrors.namaOrangTua) mappedErrors.namaOrangTua = backendErrors.namaOrangTua[0];
        setErrors(mappedErrors);
      } else {
        alert('Terjadi kesalahan saat mengirim data.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
        Pendaftaran Peserta Didik Baru (PPDB)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Pendaftaran / Bukti Pendaftaran */}
        <div className="lg:col-span-2">
          {formSubmitted && submittedData ? (
            <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-8 shadow-md dark:border-indigo-900/50 dark:bg-indigo-950/20 text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Pendaftaran Berhasil!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Bukti Pendaftaran Digital SMK Sulthan Baruna Cidaun
                </p>
              </div>

              <div className="mx-auto max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-left space-y-4 shadow-sm">
                <div className="flex justify-between border-b border-gray-100 dark:divide-gray-800 pb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">No. Pendaftaran</span>
                  <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    #PPDB-{String(submittedData.id).padStart(5, '0')}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong className="text-gray-900 dark:text-white">Nama:</strong> {submittedData.nama_lengkap}</p>
                  <p><strong className="text-gray-900 dark:text-white">NIK:</strong> {submittedData.nik}</p>
                  <p><strong className="text-gray-900 dark:text-white">Jurusan:</strong> {submittedData.pilihan_jurusan}</p>
                  <p><strong className="text-gray-900 dark:text-white">WhatsApp:</strong> {submittedData.no_whatsapp}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setSubmittedData(null);
                }}
                className="rounded bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700"
              >
                Daftar Kembali
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white mb-4">
                Formulir Pendaftaran Online
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Nama Lengkap
                </label>
                <input
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama sesuai ijazah"
                  required
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.nama && <span className="text-xs text-red-500">{errors.nama}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  NIK (Nomor Induk Kependudukan)
                </label>
                <input
                  name="nik"
                  type="text"
                  placeholder="16 digit NIK"
                  required
                  value={form.nik}
                  onChange={handleChange}
                  maxLength={16}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.nik && <span className="text-xs text-red-500">{errors.nik}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Tanggal Lahir
                </label>
                <input
                  name="ttl"
                  type="date"
                  required
                  value={form.ttl}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.ttl && <span className="text-xs text-red-500">{errors.ttl}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Pilihan Jurusan
                </label>
<select
  name="program"
  required
  value={form.program}
  onChange={handleChange}
  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
>
  <option value="">Pilih Program Keahlian</option>
  {programs.map(p => (
    <option key={p.value} value={p.value}>{p.label}</option>
  ))}
</select>
{errors.program && <span className="text-xs text-red-500">{errors.program}</span>}

<div>
  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
    Jenis Kelamin
  </label>
  <select
    name="jenisKelamin"
    required
    value={form.jenisKelamin}
    onChange={handleChange}
    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
  >
    <option value="">Pilih Jenis Kelamin</option>
    <option value="Laki-laki">Laki-laki</option>
    <option value="Perempuan">Perempuan</option>
  </select>
  {errors.jenisKelamin && <span className="text-xs text-red-500">{errors.jenisKelamin}</span>}
</div>

<div>
  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
    Nama Orang Tua/Wali
  </label>
  <input
    name="namaOrangTua"
    type="text"
    placeholder="Masukkan nama orang tua atau wali"
    required
    value={form.namaOrangTua}
    onChange={handleChange}
    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
  />
  {errors.namaOrangTua && <span className="text-xs text-red-500">{errors.namaOrangTua}</span>}
</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  WhatsApp
                </label>
                <input
                  name="whatsapp"
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  required
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.whatsapp && <span className="text-xs text-red-500">{errors.whatsapp}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  name="alamat"
                  placeholder="Alamat domisili lengkap"
                  required
                  value={form.alamat}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.alamat && <span className="text-xs text-red-500">{errors.alamat}</span>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Log Realtime Database Simulation */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sticky top-24">
            <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
              🟢 REALTIME DATABASE LOG (MySQL)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Log ini menunjukkan data pendaftar baru yang tersimpan langsung ke database MySQL.
            </p>

            {dbSimulated.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-800 rounded-md">
                <span className="text-xs text-gray-400 dark:text-gray-500">Belum ada data pendaftar masuk.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-400 text-[10px] tracking-wider border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-2 py-1.5 font-bold">No. ID</th>
                      <th className="px-2 py-1.5 font-bold">Nama</th>
                      <th className="px-2 py-1.5 font-bold">Jurusan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {dbSimulated.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-850">
                        <td className="px-2 py-2 font-mono text-[10px] text-gray-400 dark:text-gray-500">
                          #{String(row.id).padStart(5, '0')}
                        </td>
                        <td className="px-2 py-2 font-medium text-gray-950 dark:text-white truncate max-w-[100px]" title={row.nama}>
                          {row.nama}
                        </td>
                        <td className="px-2 py-2 font-semibold text-indigo-600 dark:text-indigo-400">
                          {row.program}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}