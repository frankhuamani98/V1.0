<?php

namespace App\Http\Controllers\Moto;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RegistroMotosController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Motos/RegistroMotos');
    }
}