<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion_corta',
        'detalles',
        'categoria_id',
        'subcategoria_id',
        'moto_id',
        'precio',
        'descuento',
        'imagen_principal',
        'imagenes_adicionales',
        'calificacion',
        'incluye_igv',
        'stock',
        'colores',
        'colores_personalizados',
        'destacado',
        'mas_vendido'
    ];

    protected $casts = [
        'imagenes_adicionales' => 'array',
        'colores' => 'array',
        'colores_personalizados' => 'array',
        'destacado' => 'boolean',
        'mas_vendido' => 'boolean',
        'incluye_igv' => 'boolean',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class);
    }

    public function moto()
    {
        return $this->belongsTo(Moto::class);
    }
}