<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        // Obtener productos destacados (activos) con relaciones
        $featuredProducts = Producto::where('destacado', true)
            ->where('estado', 'Activo')
            ->with(['categoria', 'subcategoria'])
            ->limit(8)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nombre' => $product->nombre,
                    'descripcion_corta' => $product->descripcion_corta,
                    'precio' => (float)$product->precio, // Aseguramos tipo float
                    'descuento' => (float)$product->descuento, // Aseguramos tipo float
                    'imagen_principal' => $product->imagen_principal,
                    'calificacion' => (float)$product->calificacion,
                    'destacado' => (bool)$product->destacado,
                    'mas_vendido' => (bool)$product->mas_vendido,
                    'estado' => $product->estado,
                    'categoria' => $product->categoria ? [
                        'nombre' => $product->categoria->nombre
                    ] : null,
                    'subcategoria' => $product->subcategoria ? [
                        'nombre' => $product->subcategoria->nombre
                    ] : null
                ];
            });

        // Obtener productos más vendidos (activos) con relaciones
        $bestSellingProducts = Producto::where('mas_vendido', true)
            ->where('estado', 'Activo')
            ->with(['categoria', 'subcategoria'])
            ->limit(8)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nombre' => $product->nombre,
                    'descripcion_corta' => $product->descripcion_corta,
                    'precio' => (float)$product->precio,
                    'descuento' => (float)$product->descuento,
                    'imagen_principal' => $product->imagen_principal,
                    'calificacion' => (float)$product->calificacion,
                    'destacado' => (bool)$product->destacado,
                    'mas_vendido' => (bool)$product->mas_vendido,
                    'estado' => $product->estado,
                    'categoria' => $product->categoria ? [
                        'nombre' => $product->categoria->nombre
                    ] : null,
                    'subcategoria' => $product->subcategoria ? [
                        'nombre' => $product->subcategoria->nombre
                    ] : null
                ];
            });

        // Obtener todos los productos activos con relaciones
        $allProducts = Producto::where('estado', 'Activo')
            ->with(['categoria', 'subcategoria'])
            ->limit(12)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nombre' => $product->nombre,
                    'descripcion_corta' => $product->descripcion_corta,
                    'precio' => (float)$product->precio,
                    'descuento' => (float)$product->descuento,
                    'imagen_principal' => $product->imagen_principal,
                    'calificacion' => (float)$product->calificacion,
                    'destacado' => (bool)$product->destacado,
                    'mas_vendido' => (bool)$product->mas_vendido,
                    'estado' => $product->estado,
                    'categoria' => $product->categoria ? [
                        'nombre' => $product->categoria->nombre
                    ] : null,
                    'subcategoria' => $product->subcategoria ? [
                        'nombre' => $product->subcategoria->nombre
                    ] : null
                ];
            });

        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts,
            'bestSellingProducts' => $bestSellingProducts,
            'allProducts' => $allProducts,
            // Mantenemos cualquier otra variable que ya tengas
            'laravelVersion' => app()->version(),
            'phpVersion' => phpversion(),
        ]);
    }
}