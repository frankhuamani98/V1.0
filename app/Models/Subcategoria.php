<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'categoria_id',
        'estado',
    ];

    // Relación con la tabla categorias
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    // Relación con productos (NUEVA RELACIÓN)
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}