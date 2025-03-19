<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\{RegisterController, LoginController};
use App\Http\Controllers\{DashboardController};
use App\Http\Controllers\Usuarios\{ListaUsuariosController, AdministradoresController, TodosUsuariosController};
use App\Http\Controllers\Productos\{AgregarProductoController, InventarioProductosController};
use App\Http\Controllers\Categorias\{CategoriasPrincipalesController, SubcategoriasController, ListaCategoriasController};
use App\Http\Controllers\Reservas\{NuevasReservasController, EstadoReservasController, ReservasFinalizadasController, HistorialReservasController};
use App\Http\Controllers\Moto\{RegistroMotosController, HistorialMotosController};
use App\Http\Controllers\Facturacion\{FacturasPendientesController, HistorialFacturasController};
use App\Http\Controllers\Soporte\{ManualUsuarioController, SoporteTecnicoController};
use App\Http\Controllers\Comentarios\{ListaComentariosController};
use App\Http\Controllers\Reparaciones\{HistorialReparacionesController, OrdenesFinalizadasController, OrdenesProcesoController};
use App\Http\Controllers\Tecnicos\{ListaTecnicosController, AsignarReparacionesController, HistorialTecnicosController};
use App\Http\Controllers\Pedidos\{EstadoPedidosController, NuevosPedidosController, PedidosFinalizadosController, HistorialPedidosController};

// Ruta principal
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Rutas de autenticación
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::post('/register', [RegisterController::class, 'store'])->name('register.store');

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::match(['get', 'post'], '/logout', [LoginController::class, 'logout'])->name('logout');

// Ruta del dashboard (protegida con middleware 'auth')
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth')
    ->name('dashboard');

// Rutas de Usuarios
Route::prefix('usuarios')->group(function () {
    Route::get('/', [ListaUsuariosController::class, 'index'])->name('usuarios');
    Route::get('/administradores', [AdministradoresController::class, 'index'])->name('usuarios.administradores');
    Route::get('/todos', [TodosUsuariosController::class, 'index'])->name('usuarios.todos');
});

// Rutas de Productos
Route::prefix('productos')->group(function () {
    Route::get('/agregar', [AgregarProductoController::class, 'index'])->name('productos.agregar');
    Route::get('/inventario', [InventarioProductosController::class, 'index'])->name('productos.inventario');
});

// Rutas de Categorías
Route::prefix('categorias')->group(function () {
    Route::get('/principales', [CategoriasPrincipalesController::class, 'index'])->name('categorias.principales');
    Route::post('/principales', [CategoriasPrincipalesController::class, 'store'])->name('categorias.principales.store');
    Route::put('/principales/{id}', [CategoriasPrincipalesController::class, 'update'])->name('categorias.principales.update');
    Route::delete('/principales/{id}', [CategoriasPrincipalesController::class, 'destroy'])->name('categorias.principales.destroy');
    
    // Rutas para subcategorías
    Route::get('/subcategorias', [SubcategoriasController::class, 'index'])->name('subcategorias.index');
    Route::post('/subcategorias', [SubcategoriasController::class, 'store'])->name('subcategorias.store');
    Route::put('/subcategorias/{subcategoria}', [SubcategoriasController::class, 'update'])->name('subcategorias.update');
    Route::delete('/subcategorias/{subcategoria}', [SubcategoriasController::class, 'destroy'])->name('subcategorias.destroy');

    // Rutas para listar categorías

    Route::get('/lista', [ListaCategoriasController::class, 'index'])->name('categorias.lista');

});

// Rutas de Reservas
Route::prefix('reservas')->group(function () {
    Route::get('/nuevas', [NuevasReservasController::class, 'index'])->name('reservas.nuevas');
    Route::get('/estado', [EstadoReservasController::class, 'index'])->name('reservas.estado');
    Route::get('/finalizadas', [ReservasFinalizadasController::class, 'index'])->name('reservas.finalizadas');
    Route::get('/historial', [HistorialReservasController::class, 'index'])->name('reservas.historial');
});

// Rutas de Motos
Route::prefix('motos')->group(function () {
    Route::get('/registro', [RegistroMotosController::class, 'index'])->name('motos.registro');
    Route::get('/historial', [HistorialMotosController::class, 'index'])->name('motos.historial');
});

// Rutas de Facturación
Route::prefix('facturacion')->group(function () {
    Route::get('/pendientes', [FacturasPendientesController::class, 'index'])->name('facturacion.pendientes');
    Route::get('/historial', [HistorialFacturasController::class, 'index'])->name('facturacion.historial');
});

// Rutas de Soporte
Route::prefix('soporte')->group(function () {
    Route::get('/manual', [ManualUsuarioController::class, 'index'])->name('soporte.manual');
    Route::get('/tecnico', [SoporteTecnicoController::class, 'index'])->name('soporte.tecnico');
});

// Rutas de Comentarios
Route::prefix('comentarios')->group(function () {
    Route::get('/lista', [ListaComentariosController::class, 'index'])->name('comentarios.lista');
    Route::get('/aprobados', [ComentariosAprobadosController::class, 'index'])->name('comentarios.aprobados');
    Route::get('/no-aprobados', [ComentariosNoAprobadosController::class, 'index'])->name('comentarios.no-aprobados');
});

// Rutas de Reparaciones
Route::prefix('reparaciones')->group(function () {
    Route::get('/proceso', [OrdenesProcesoController::class, 'index'])->name('reparaciones.proceso');
    Route::get('/finalizadas', [OrdenesFinalizadasController::class, 'index'])->name('reparaciones.finalizadas');
    Route::get('/historial', [HistorialReparacionesController::class, 'index'])->name('reparaciones.historial');
});


// Rutas de Técnicos
Route::prefix('tecnicos')->group(function () {
    Route::get('/lista', [ListaTecnicosController::class, 'index'])->name('tecnicos.lista');
    Route::get('/asignar', [AsignarReparacionesController::class, 'index'])->name('tecnicos.asignar');
    Route::get('/historial', [HistorialTecnicosController::class, 'index'])->name('tecnicos.historial');
});


// Rutas de pedidos
Route::prefix('pedidos')->group(function () {
    Route::get('/nuevos', [NuevosPedidosController::class, 'index'])->name('pedidos.nuevos');
    Route::get('/estado', [EstadoPedidosController::class, 'index'])->name('pedidos.estado');
    Route::get('/finalizados', [PedidosFinalizadosController::class, 'index'])->name('pedidos.finalizados');
    Route::get('/historial', [HistorialPedidosController::class, 'index'])->name('pedidos.historial');
});