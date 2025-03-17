import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { PlusCircle, Edit, Trash, MoreVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { router } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';

interface Categoria {
    id: number;
    nombre: string;
    estado: string;
    created_at: string;
    updated_at: string;
}

interface CategoriasPrincipalesProps {
    categorias: Categoria[];
}

const CategoriasPrincipales = ({ categorias }: CategoriasPrincipalesProps) => {
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [error, setError] = useState('');
    const [editandoCategoria, setEditandoCategoria] = useState<Categoria | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setError('El nombre de la categoría es requerido');
            return;
        }

        if (editandoCategoria) {
            // Si estamos editando, actualizamos la categoría
            router.put(`/categorias/principales/${editandoCategoria.id}`, {
                nombre,
                estado,
            }, {
                onSuccess: () => {
                    setNombre('');
                    setEstado('Activo');
                    setEditandoCategoria(null);
                    setError('');
                },
                onError: (errors) => {
                    setError(errors.nombre || 'Error al actualizar la categoría');
                },
            });
        } else {
            // Si no, creamos una nueva categoría
            router.post('/categorias/principales', {
                nombre,
                estado,
            }, {
                onSuccess: () => {
                    setNombre('');
                    setEstado('Activo');
                    setError('');
                },
                onError: (errors) => {
                    setError(errors.nombre || 'Error al guardar la categoría');
                },
            });
        }
    };

    const handleEditar = (categoria: Categoria) => {
        setNombre(categoria.nombre);
        setEstado(categoria.estado);
        setEditandoCategoria(categoria);
    };

    const handleEliminar = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta categoría?')) {
            router.delete(`/categorias/principales/${id}`, {
                onSuccess: () => {
                    // Recargar la página o actualizar la lista de categorías
                },
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Categorías Principales</h1>
            <p className="text-muted-foreground">
                Aquí puedes gestionar las categorías principales.
            </p>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">
                        {editandoCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre de la Categoría</Label>
                            <Input
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ingrese el nombre de la categoría"
                                className="w-full"
                            />
                            {error && <p className="text-sm text-destructive">{error}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado de la Categoría</Label>
                            <Select value={estado} onValueChange={setEstado}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccione un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Activo">Activo</SelectItem>
                                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {editandoCategoria ? 'Actualizar Categoría' : 'Agregar Categoría'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Listado de categorías existentes */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Categorías Existentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {categorias.map((categoria) => (
                            <div key={categoria.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                {/* Nombre de la categoría (izquierda) */}
                                <p className="font-medium flex-1">{categoria.nombre}</p>

                                {/* Estado (centrado) */}
                                <div className="flex-1 flex justify-center">
                                    <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                                        {categoria.estado}
                                    </span>
                                </div>

                                {/* Menú desplegable para acciones (derecha) */}
                                <div className="flex space-x-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditar(categoria)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEliminar(categoria.id)} className="text-red-600">
                                                <Trash className="mr-2 h-4 w-4" />
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoriasPrincipales;