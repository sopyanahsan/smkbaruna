<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /** Root Blade template loaded on first visit */
    protected $rootView = 'app';

    /** Determines the asset version for cache-busting */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /** Shared props sent to every Inertia response */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            //
        ]);
    }
}