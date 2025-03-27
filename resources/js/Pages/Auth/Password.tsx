import { useForm } from '@inertiajs/react';
import { Mail, Send } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';

export default function ForgotPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  // Función para validar el correo electrónico
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campo vacío
    if (!data.email.trim()) {
      toast.error('Por favor, ingrese su correo electrónico');
      return;
    }

    // Validación de formato de correo
    if (!isValidEmail(data.email)) {
      toast.error('Por favor, ingrese un correo electrónico válido');
      return;
    }

    // Envía el formulario usando Inertia
    post('/forgot-password', {
      onSuccess: () => {
        toast.success('Enlace enviado', {
          description: 'Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico.',
        });
        reset();
      },
      onError: (errors) => {
        if (errors.email) {
          toast.error('Error al enviar el enlace', {
            description: errors.email,
          });
        } else {
          toast.error('Error inesperado', {
            description: 'Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.',
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
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Restablecer contraseña</CardTitle>
          <CardDescription className="text-center">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo: Correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className="pl-10"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Botón de envío */}
            <Button type="submit" className="w-full gap-2" disabled={processing}>
              {processing ? 'Enviando...' : 'Enviar enlace'}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            ¿Recordaste tu contraseña?{' '}
            <a href="/login" className="text-primary font-medium hover:underline">
              Iniciar sesión
            </a>
          </p>
        </CardFooter>
      </Card>
      <Toaster position="top-center" />
    </div>
  );
}