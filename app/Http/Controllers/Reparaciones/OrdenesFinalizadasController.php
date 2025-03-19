<?php

namespace App\Http\Controllers\Reparaciones;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class OrdenesFinalizadasController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Reparaciones/OrdenesFinalizadas');
    }
}
