<?php

namespace App\Http\Controllers\Descuentos;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RuletasDescuentosController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Descuentos/RuletasDescuentos');
    }
}