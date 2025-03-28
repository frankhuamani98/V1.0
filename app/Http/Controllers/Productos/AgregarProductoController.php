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

    /**
     * Normaliza un valor numérico con formato de moneda
     */
    protected function normalizeCurrency($value)
    {
        if (is_null($value)) {
            return 0.00;
        }

        // Eliminar caracteres no numéricos excepto punto decimal
        return (float) preg_replace('/[^0-9.]/', '', str_replace(',', '', $value));
    }

    /**
     * Procesa y valida las imágenes adicionales
     */
    protected function processAdditionalImages($input)
    {
        // Caso 1: Input es null o vacío
        if (empty($input)) {
            return [];
        }

        // Caso 2: Input es un string JSON
        if (is_string($input)) {
            $input = json_decode($input, true);

            // Si el JSON es inválido
            if (json_last_error() !== JSON_ERROR_NONE) {
                return [];
            }
        }

        // Caso 3: Input no es un array en este punto
        if (!is_array($input)) {
            return [];
        }

        $validImages = [];
        foreach ($input as $item) {
            // Caso 3.1: Item es un array con estructura {url: string, estilo?: string}
            if (is_array($item) && !empty($item['url'])) {
                $url = filter_var($item['url'], FILTER_VALIDATE_URL);
                if ($url !== false) {
                    $validImages[] = [
                        'url' => $url,
                        'estilo' => $item['estilo'] ?? ''
                    ];
                }
            }
            // Caso 3.2: Item es solo una URL string
            elseif (is_string($item) && filter_var($item, FILTER_VALIDATE_URL)) {
                $validImages[] = [
                    'url' => $item,
                    'estilo' => ''
                ];
            }
        }

        return $validImages;
    }

    public function store(Request $request)
    {
        // Procesar imágenes adicionales
        $imagenesProcesadas = $this->processAdditionalImages($request->imagenes_adicionales);

        // Normalizar campos numéricos
        $request->merge([
            'precio' => $this->normalizeCurrency($request->precio),
            'descuento' => $this->normalizeCurrency($request->descuento),
            'imagenes_adicionales' => $imagenesProcesadas
        ]);

        // Validación
        $validator = Validator::make($request->all(), [
            'codigo' => 'required|string|max:50|unique:productos',
            'nombre' => 'required|string|max:255',
            'descripcion_corta' => 'required|string|max:255',
            'detalles' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'subcategoria_id' => 'required|exists:subcategorias,id',
            'moto_id' => 'nullable|exists:motos,id',
            'precio' => 'required|numeric|min:0|max:9999999.99',
            'descuento' => 'required|numeric|min:0|max:100',
            'imagen_principal' => 'required|url|max:500',
            'imagenes_adicionales' => 'nullable|array|max:6',
            'imagenes_adicionales.*.url' => 'required|url|max:500',
            'imagenes_adicionales.*.estilo' => 'nullable|string|max:100',
            'calificacion' => 'required|integer|min:0|max:5',
            'incluye_igv' => 'required|boolean',
            'stock' => 'required|integer|min:0',
            'destacado' => 'required|boolean',
            'mas_vendido' => 'required|boolean',
        ], [
            'imagenes_adicionales.max' => 'Máximo 6 imágenes adicionales permitidas',
            'imagenes_adicionales.*.url.required' => 'La URL de la imagen es requerida',
            'imagenes_adicionales.*.url.url' => 'La URL no tiene un formato válido',
            'subcategoria_id.required' => 'Seleccione una subcategoría'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        DB::beginTransaction();
        try {
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
                'imagenes_adicionales' => $request->imagenes_adicionales, // Ya procesado
                'calificacion' => $request->calificacion,
                'incluye_igv' => $request->incluye_igv,
                'stock' => $request->stock,
                'destacado' => $request->destacado,
                'mas_vendido' => $request->mas_vendido,
                'estado' => 'Activo'
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
