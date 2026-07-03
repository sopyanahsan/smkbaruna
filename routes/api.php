<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PpdbController;

Route::post('/ppdb', [PpdbController::class, 'store']);