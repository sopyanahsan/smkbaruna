<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$pages = [
    '/' => 'home',
    '/profil' => 'profil',
    '/jurusan' => 'jurusan',
    '/galeri' => 'galeri',
    '/kontak' => 'kontak',
    '/ppdb' => 'ppdb',
    '/portal' => 'portal',
    '/tentang' => 'tentang',
    '/news' => 'news',
];

foreach ($pages as $uri => $page) {
    Route::get($uri, fn () => Inertia::render('App', ['page' => $page]));
}