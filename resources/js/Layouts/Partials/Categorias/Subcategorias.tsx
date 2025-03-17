import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { PlusCircle, Edit, Trash, MoreVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { router } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';

interface Subcategoria {
    id: number;
    nombre: string;
    categoria_id: number;
    estado: string;
    created_at: string;
    updated_at: string;
    categoria: {
        id: number;
        nombre: string;
    };
}

interface SubcategoriasProps {
    subcategorias: Subcategoria[];
    categorias: { id: number; nombre: string }[];
}

const Subcategorias = ({ subcategorias, categorias }: SubcategoriasProps) => {
    const [nombre, setNombre] = useState('');
    const [categoriaId, setCategoriaId] = useState<number | ''>('');
    const [estado, setEstado] = useState('Activo');
    const [error, setError] = useState('');
    const [editandoSubcategoria, setEditandoSubcategoria] = useState<Subcategoria | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !categoriaId) {
            setError('Todos los campos son requeridos');
            return;
        }

        if (editandoSubcategoria) {
            // Si estamos editando, actualizamos la subcategoría
            router.put(`/categorias/subcategorias/${editandoSubcategoria.id}`, {
                nombre,
                categoria_id: categoriaId,
                estado,
            }, {
                onSuccess: () => {
                    setNombre('');
                    setCategoriaId('');
                    setEstado('Activo');
                    setEditandoSubcategoria(null);
                    setError('');
                },
                onError: (errors) => {
                    setError(errors.nombre || 'Error al actualizar la subcategoría');
                },
            });
        } else {
            // Si no, creamos una nueva subcategoría
            router.post('/categorias/subcategorias', {
                nombre,
                categoria_id: categoriaId,
                estado,
            }, {
                onSuccess: () => {
                    setNombre('');
                    setCategoriaId('');
                    setEstado('Activo');
                    setError('');
                },
                onError: (errors) => {
                    setError(errors.nombre || 'Error al guardar la subcategoría');
                },
            });
        }
    };

    const handleEditar = (subcategoria: Subcategoria) => {
        setNombre(subcategoria.nombre);
        setCategoriaId(subcategoria.categoria_id);
        setEstado(subcategoria.estado);
        setEditandoSubcategoria(subcategoria);
    };

    const handleEliminar = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta subcategoría?')) {
            router.delete(`/categorias/subcategorias/${id}`);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Subcategorías</h1>
            <p className="text-muted-foreground">
                Aquí puedes gestionar las subcategorías.
            </p>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">
                        {editandoSubcategoria ? 'Editar Subcategoría' : 'Agregar Nueva Subcategoría'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre de la Subcategoría</Label>
                            <Input
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ingrese el nombre de la subcategoría"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categoria">Categoría Principal</Label>
                            <Select value={categoriaId.toString()} onValueChange={(value) => setCategoriaId(Number(value))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccione una categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categorias.map((categoria) => (
                                        <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                            {categoria.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado de la Subcategoría</Label>
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
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {editandoSubcategoria ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Listado de subcategorías existentes */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Subcategorías Existentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {subcategorias.map((subcategoria) => (
                            <div key={subcategoria.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                {/* Nombre de la subcategoría (izquierda) */}
                                <p className="font-medium flex-1">{subcategoria.nombre}</p>

                                {/* Nombre de la categoría principal (centro) */}
                                <div className="flex-1 flex justify-center">
                                    <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                                        {subcategoria.categoria.nombre}
                                    </span>
                                </div>

                                {/* Estado de la subcategoría (centro) */}
                                <div className="flex-1 flex justify-center">
                                    <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                                        {subcategoria.estado}
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
                                            <DropdownMenuItem onClick={() => handleEditar(subcategoria)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEliminar(subcategoria.id)} className="text-red-600">
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

export default Subcategorias;