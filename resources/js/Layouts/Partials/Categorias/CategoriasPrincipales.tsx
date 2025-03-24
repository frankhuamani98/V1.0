import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { PlusCircle, Edit, Trash, MoreVertical, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { router } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';

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
    const [searchTerm, setSearchTerm] = useState('');

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

    const cancelarEdicion = () => {
        setNombre('');
        setEstado('Activo');
        setEditandoCategoria(null);
        setError('');
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'Activo':
                return 'bg-green-100 text-green-800';
            case 'Inactivo':
                return 'bg-red-100 text-red-800';
            case 'Pendiente':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredCategorias = categorias.filter(categoria => 
        categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoria.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Categorías Principales</h1>
                <p className="text-gray-500 mt-2">
                    Gestiona las categorías principales del sistema
                </p>
            </div>

            <Card className="shadow-md border-t-4 border-t-blue-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center text-blue-700">
                        {editandoCategoria ? (
                            <Edit className="mr-2 h-5 w-5" />
                        ) : (
                            <PlusCircle className="mr-2 h-5 w-5" />
                        )}
                        {editandoCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre" className="font-medium">Nombre de la Categoría</Label>
                                <Input
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Ingrese el nombre de la categoría"
                                    className="w-full"
                                />
                                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="estado" className="font-medium">Estado de la Categoría</Label>
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
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                            {editandoCategoria && (
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={cancelarEdicion}
                                    className="border-gray-300"
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Cancelar
                                </Button>
                            )}
                            <Button 
                                type="submit" 
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {editandoCategoria ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Actualizar Categoría
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Categoría
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Listado de categorías existentes */}
            <Card className="shadow-md">
                <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <CardTitle className="text-xl text-gray-800">Categorías Existentes</CardTitle>
                    <div className="w-full sm:w-64 mt-2 sm:mt-0">
                        <Input
                            placeholder="Buscar categorías..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredCategorias.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            {searchTerm ? 'No se encontraron categorías con ese término' : 'No hay categorías disponibles'}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="hidden md:grid grid-cols-12 text-sm font-medium text-gray-500 py-2 px-4">
                                <div className="col-span-5">NOMBRE</div>
                                <div className="col-span-4 text-center">ESTADO</div>
                                <div className="col-span-3 text-right">ACCIONES</div>
                            </div>
                            {filteredCategorias.map((categoria) => (
                                <div 
                                    key={categoria.id} 
                                    className="grid grid-cols-1 md:grid-cols-12 items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <p className="font-medium text-gray-800 md:col-span-5">
                                        {categoria.nombre}
                                    </p>
                                    <div className="md:col-span-4 flex justify-start md:justify-center my-2 md:my-0">
                                        <span className={`text-sm px-3 py-1 rounded-full font-medium ${getEstadoColor(categoria.estado)}`}>
                                            {categoria.estado}
                                        </span>
                                    </div>
                                    <div className="flex justify-end space-x-2 md:col-span-3">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={() => handleEditar(categoria)}
                                                        className="border-gray-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Editar categoría</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={() => handleEliminar(categoria.id)}
                                                        className="border-gray-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Eliminar categoría</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoriasPrincipales;