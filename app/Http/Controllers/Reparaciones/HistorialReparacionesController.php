<?php

namespace App\Http\Controllers\Reparaciones;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class HistorialReparacionesController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Reparaciones/HistorialReparaciones');
    }
}
