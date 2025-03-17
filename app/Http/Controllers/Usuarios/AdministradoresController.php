<?php

namespace App\Http\Controllers\Usuarios;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AdministradoresController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Usuarios/Administradores');
    }
}