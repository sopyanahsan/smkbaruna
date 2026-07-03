<?php

namespace App\Http\Controllers;

use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PpdbController extends Controller
{
public function store(Request $request)
{
    $validated = $request->validate([
        'namaLengkap'    => 'required|string|max:255',
        'nik'            => ['required', 'digits:16', 'unique:pendaftars,nik'],
        'tanggalLahir'   => 'required|date',
        'jenisKelamin'   => 'required|in:Laki-laki,Perempuan',
        'pilihanJurusan' => ['required', Rule::in(['APHP', 'MPLB', 'TKRO', 'TJKT'])],
        'namaOrangTua'   => 'required|string|max:255',
        'noWhatsapp'     => ['required', 'regex:/^\+?\d{9,15}$/'],
        'alamatLengkap'  => 'required|string',
    ]);

    $data = [
        'nama_lengkap'    => $validated['namaLengkap'],
        'nik'             => $validated['nik'],
        'tanggal_lahir'   => $validated['tanggalLahir'],
        'jenis_kelamin'   => $validated['jenisKelamin'],
        'pilihan_jurusan' => $validated['pilihanJurusan'],
        'nama_orang_tua'  => $validated['namaOrangTua'],
        'no_whatsapp'     => $validated['noWhatsapp'],
        'alamat_lengkap'  => $validated['alamatLengkap'],
    ];

    $pendaftar = Pendaftar::create($data);

    return response()->json([
        'status' => 'success',
        'data'   => $pendaftar,
    ], 201);
}
}