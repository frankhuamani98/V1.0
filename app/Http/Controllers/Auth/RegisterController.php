<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    /**
     * Maneja el registro de un nuevo usuario.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dni' => 'required|string|size:8|unique:users',
            'sexo' => 'required|string|in:Masculino,Femenino,Prefiero no decirlo',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|size:9|unique:users',
            'address' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'terms' => 'required|accepted',
        ]);

        // Si la validación falla, devolver errores
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Crear el usuario
        $user = User::create([
            'username' => $request->username,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'dni' => $request->dni,
            'sexo' => $request->sexo,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'terms' => $request->terms,
            'role' => 'user',
            'status' => 'pending',
        ]);

        // Autenticar al usuario después del registro
        Auth::login($user);

        // Redirigir al inicio con un mensaje de éxito
        return redirect('/')->with('success', '¡Registro exitoso!');
    }
}