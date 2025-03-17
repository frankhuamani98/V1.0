<?php

namespace App\Http\Controllers\Descuentos;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SubirDescuentoController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Descuentos/SubirDescuento');
    }
}