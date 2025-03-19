<?php

namespace App\Http\Controllers\Reparaciones;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class OrdenesProcesoController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Reparaciones/OrdenesProceso');
    }
}
