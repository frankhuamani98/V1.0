<?php

namespace App\Http\Controllers\Usuarios;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ListaUsuariosController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Usuarios/ListaUsuarios');
    }
}