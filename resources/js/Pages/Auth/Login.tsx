import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Toaster, toast } from 'sonner';

interface FormData {
    identifier: string;
    password: string;
    [key: string]: string;
}

interface Errors {
    identifier?: string;
    password?: string;
}

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        identifier: '', // DNI, email o username
        password: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validación del campo de identificación (DNI, correo electrónico o usuario)
        if (!data.identifier) {
            toast.error('Por favor, ingrese su DNI, correo electrónico o usuario');
            return;
        }

        // Validación de la contraseña
        if (!data.password) {
            toast.error('Por favor, ingrese su contraseña');
            return;
        }

        // Envía el formulario usando Inertia
        post('/login', {
            onSuccess: () => {
                toast.success('Inicio de sesión exitoso!', {
                    description: `Bienvenido de nuevo!`,
                });
                reset(); // Limpia el formulario después del éxito
            },
            onError: (errors: Errors) => {
                // Mostrar errores específicos
                if (errors.identifier) {
                    toast.error('Error en el inicio de sesión', {
                        description: errors.identifier,
                    });
                } else if (errors.password) {
                    toast.error('Error en el inicio de sesión', {
                        description: errors.password,
                    });
                } else {
                    toast.error('Error en el inicio de sesión', {
                        description: 'Por favor, revise los errores en el formulario.',
                    });
                }
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-2">
                        <div className="bg-primary p-2 rounded-full">
                            <User className="h-6 w-6 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingrese su información para iniciar sesión
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Campo: Identificador (DNI, correo electrónico o usuario) */}
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                DNI, Correo electrónico o Usuario
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="identifier"
                                    type="text"
                                    placeholder="Ingrese su DNI, correo electrónico o usuario"
                                    className="pl-10"
                                    value={data.identifier}
                                    onChange={(e) => setData('identifier', e.target.value)}
                                />
                            </div>
                            {errors.identifier && <p className="text-sm text-red-500">{errors.identifier}</p>}
                        </div>

                        {/* Campo: Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        {/* Botón de envío */}
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        ¿No tiene una cuenta?{' '}
                        <a href="/register" className="text-primary font-medium hover:underline">
                            Registrarse
                        </a>
                    </p>
                </CardFooter>
            </Card>
            <Toaster />
        </div>
    );
}