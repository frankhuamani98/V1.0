<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Producto;
use App\Models\Moto;
use App\Models\Categoria;

class ResultadosController extends Controller
{
    public function index()
    {
        $year = request('year');
        $brand = request('brand');
        $model = request('model');

        // Buscar la moto en la base de datos
        $moto = Moto::where('marca', $brand)
                    ->where('modelo', $model)
                    ->first();

        // Obtener productos relacionados
        $productos = [];
        $categorias = [];

        if ($moto) {
            // Productos específicos para esta moto
            $productos = Producto::with(['categoria', 'subcategoria'])
                ->where('moto_id', $moto->id)
                ->where('estado', 'Activo')
                ->get()
                ->map(function ($producto) {
                    return [
                        'id' => $producto->id,
                        'nombre' => $producto->nombre,
                        'precio' => $producto->precio,
                        'descuento' => $producto->descuento,
                        'imagen_principal' => $producto->imagen_principal,
                        'calificacion' => $producto->calificacion,
                        'stock' => $producto->stock,
                        'categoria' => $producto->categoria->nombre,
                        'compatibility' => 'Alta' // Todos son compatibles al 100%
                    ];
                });

            // Obtener categorías únicas para los filtros
            $categorias = Categoria::whereHas('productos', function($query) use ($moto) {
                $query->where('moto_id', $moto->id);
            })
            ->pluck('nombre')
            ->toArray();
        }

        return Inertia::render('Home/Partials/Resultado', [
            'year' => $year,
            'brand' => $brand,
            'model' => $model,
            'productos' => $productos,
            'categorias' => $categorias,
            'motoEncontrada' => $moto !== null
        ]);
    }
}