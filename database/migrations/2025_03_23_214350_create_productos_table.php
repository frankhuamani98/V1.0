<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique();
            $table->string('nombre');
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');
            $table->foreignId('subcategoria_id')->constrained('subcategorias')->onDelete('cascade');
            $table->text('detalles')->nullable();
            $table->text('descripcion_corta')->nullable();
            $table->decimal('precio', 8, 2);
            $table->decimal('descuento', 5, 2)->default(0);
            $table->decimal('precio_total', 8, 2);
            $table->decimal('igv', 5, 2)->default(18);
            $table->integer('calificacion')->default(0);
            $table->integer('stock')->default(0);
            $table->string('foto_url')->nullable();
            $table->boolean('disponible')->default(true);
            $table->boolean('destacado')->default(false);
            $table->boolean('mas_vendido')->default(false);
            $table->json('fotos_adicionales')->nullable();
            $table->json('compatibilidad')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};