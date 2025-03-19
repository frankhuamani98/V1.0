<?php

namespace App\Http\Controllers\Tecnicos;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ListaTecnicosController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Tecnicos/ListaTecnicos');
    }
}
