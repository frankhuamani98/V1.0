<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Muestra el formulario de inicio de sesión.
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Maneja el intento de inicio de sesión.
     */
    public function login(Request $request)
    {
        // Validar los datos del formulario
        $credentials = $request->validate([
            'identifier' => 'required', // Campo único para DNI, email o username
            'password' => 'required',
        ]);

        // Determinar el campo a usar para la autenticación
        $field = filter_var($credentials['identifier'], FILTER_VALIDATE_EMAIL) ? 'email' :
                 (is_numeric($credentials['identifier']) ? 'dni' : 'username');

        // Intentar autenticar al usuario
        if (Auth::attempt([$field => $credentials['identifier'], 'password' => $credentials['password']])) {
            $request->session()->regenerate(); // Regenerar la sesión

            $user = Auth::user();

            // Redirigir según el rol del usuario
            if ($user->role === 'admin') {
                return Inertia::render('Auth/AdminRedirect', [
                    'user' => $user,
                ]);
            }

            return redirect('/')->with('success', '¡Bienvenido de nuevo!');
        }

        // Si la autenticación falla, devolver errores
        return back()->withErrors([
            'identifier' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
        ]);
    }

    /**
     * Maneja el cierre de sesión.
     */
    public function logout(Request $request)
    {
        Auth::logout(); // Cerrar sesión

        $request->session()->invalidate(); // Invalidar la sesión
        $request->session()->regenerateToken(); // Regenerar el token de sesión

        return redirect('/'); // Redirigir al inicio
    }
}