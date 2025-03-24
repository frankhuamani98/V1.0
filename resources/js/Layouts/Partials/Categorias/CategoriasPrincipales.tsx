import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
<<<<<<< HEAD
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { PlusCircle, Edit, Trash, MoreVertical, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { router } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
=======
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
>>>>>>> 69232be (categorias)

const CategoriasPrincipales = () => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Electrónica', estado: 'Activo' },
    { id: 2, nombre: 'Ropa', estado: 'Activo' },
    { id: 3, nombre: 'Hogar', estado: 'Inactivo' }
  ]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

<<<<<<< HEAD
const CategoriasPrincipales = ({ categorias }: CategoriasPrincipalesProps) => {
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [error, setError] = useState('');
    const [editandoCategoria, setEditandoCategoria] = useState<Categoria | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
=======
    if (editandoId) {
      setCategorias(categorias.map(cat =>
        cat.id === editandoId ? { ...cat, nombre, estado } : cat
      ));
      setEditandoId(null);
    } else {
      setCategorias([...categorias, {
        id: Date.now(),
        nombre,
        estado
      }]);
    }
>>>>>>> 69232be (categorias)

    setNombre('');
    setEstado('Activo');
  };

  const handleEliminar = (id: number) => {
    setCategorias(categorias.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Categorías Principales</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2 text-gray-600">
          Administra las categorías principales de tu sistema
        </p>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl text-gray-800 font-medium">
            {editandoId ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Nombre de la categoría</label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Electrónica"
                className="text-sm sm:text-base border-gray-300 focus:ring-1 sm:focus:ring-2 focus:ring-blue-500"
              />
            </div>

<<<<<<< HEAD
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
=======
            <div className="space-y-1 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Estado</label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger className="text-sm sm:text-base border-gray-300 focus:ring-1 sm:focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo" className="text-sm sm:text-base">Activo</SelectItem>
                  <SelectItem value="Inactivo" className="text-sm sm:text-base">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium">
              <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {editandoId ? 'Actualizar Categoría' : 'Agregar Categoría'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-lg sm:text-xl text-gray-800 font-medium">Categorías Registradas</CardTitle>
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {categorias.length} categorías
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg border-gray-200 hover:bg-gray-50 transition-colors gap-2 sm:gap-0">
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm sm:text-base">{categoria.nombre}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                  categoria.estado === 'Activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {categoria.estado}
                </span>

                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNombre(categoria.nombre);
                      setEstado(categoria.estado);
                      setEditandoId(categoria.id);
                    }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-blue-600 hover:text-blue-800 border-gray-300 hover:bg-blue-50"
                  >
                    <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEliminar(categoria.id)}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-red-600 hover:text-red-800 border-gray-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
>>>>>>> 69232be (categorias)
};

export default CategoriasPrincipales;
