<?php

namespace App\Http\Controllers\Publicidad;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SubirPublicidadController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Publicidad/SubirPublicidad');
    }
}