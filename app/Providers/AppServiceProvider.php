<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Compartir datos globales con Inertia
        Inertia::share([
            'app' => [
                'name' => config('app.name'),
            ],
        ]);

        // Prefetch de Vite
        Vite::prefetch(concurrency: 3);
    }
}
