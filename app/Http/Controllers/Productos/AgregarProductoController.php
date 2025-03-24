<?php

namespace App\Http\Controllers\Productos;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Moto;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AgregarProductoController extends Controller
{
    public function index()
    {
        $categorias = Categoria::with(['subcategorias' => function($query) {
            $query->where('estado', 'Activo');
        }])->where('estado', 'Activo')->get();

        $motos = Moto::where('estado', 'Activo')->get();

        return Inertia::render('Dashboard/Productos/AgregarProducto', [
            'categorias' => $categorias,
            'motos' => $motos
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'codigo' => 'required|string|max:50|unique:productos',
            'nombre' => 'required|string|max:255',
            'descripcion_corta' => 'required|string|max:255',
            'detalles' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'subcategoria_id' => 'required|exists:subcategorias,id',
            'moto_id' => 'nullable|exists:motos,id',
            'precio' => 'required|numeric|min:0',
            'descuento' => 'required|numeric|min:0|max:100',
            'imagen_principal' => 'required|url',
            'imagenes_adicionales' => 'nullable|array|max:4',
            'imagenes_adicionales.*' => 'url',
            'calificacion' => 'required|integer|min:0|max:5',
            'incluye_igv' => 'required|boolean',
            'stock' => 'required|integer|min:0',
            'colores' => 'nullable|array',
            'coloresPersonalizados' => 'nullable|array',
            'destacado' => 'required|boolean',
            'mas_vendido' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            DB::beginTransaction();

            $producto = Producto::create([
                'codigo' => $request->codigo,
                'nombre' => $request->nombre,
                'descripcion_corta' => $request->descripcion_corta,
                'detalles' => $request->detalles,
                'categoria_id' => $request->categoria_id,
                'subcategoria_id' => $request->subcategoria_id,
                'moto_id' => $request->moto_id,
                'precio' => $request->precio,
                'descuento' => $request->descuento,
                'imagen_principal' => $request->imagen_principal,
                'imagenes_adicionales' => json_encode($request->imagenes_adicionales),
                'calificacion' => $request->calificacion,
                'incluye_igv' => $request->incluye_igv,
                'stock' => $request->stock,
                'colores' => json_encode($request->colores),
                'colores_personalizados' => json_encode($request->coloresPersonalizados),
                'destacado' => $request->destacado,
                'mas_vendido' => $request->mas_vendido,
            ]);

            DB::commit();

            return redirect()->route('productos.agregar')
                ->with('success', 'Producto creado exitosamente');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->with('error', 'Error al crear el producto: ' . $e->getMessage())
                ->withInput();
        }
    }
}