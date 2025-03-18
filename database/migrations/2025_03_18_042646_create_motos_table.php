<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('motos', function (Blueprint $table) {
            $table->id();
            $table->integer('año'); // Año de la moto
            $table->string('modelo')->unique(); // Modelo único
            $table->string('marca')->unique(); // Marca única
            $table->string('estado'); // Estado de la moto
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('motos');
    }
};