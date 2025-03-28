import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Plus, Edit2, Trash2, Search, Filter, ChevronDown, CheckCircle2, XCircle, ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/Components/ui/command';

// Componente premium de iconos para categorías (se mantiene igual)
const CategoriaIcono = ({ categoria, className = "" }: { categoria: 'Electrónica' | 'Ropa' | 'Hogar' | 'Default'; className?: string }) => {
  const iconos: Record<'Electrónica' | 'Ropa' | 'Hogar' | 'Default', JSX.Element> = {
    'Electrónica': (
      <svg className={`${className} text-blue-600 hover:scale-110 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Ropa': (
      <svg className={`${className} text-pink-500 hover:scale-110 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    'Hogar': (
      <svg className={`${className} text-amber-600 hover:scale-110 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    'Default': (
      <svg className={`${className} text-gray-500 hover:scale-110 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  };

  return iconos[categoria] || iconos['Default'];
};

const CategoriasPrincipales = () => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nombre: 'Electrónica',
      estado: 'Activo',
      fecha: '2023-05-15',
      productos: 124
    },
    {
      id: 2,
      nombre: 'Ropa',
      estado: 'Activo',
      fecha: '2023-06-20',
      productos: 89
    },
    {
      id: 3,
      nombre: 'Hogar',
      estado: 'Inactivo',
      fecha: '2023-07-10',
      productos: 45
    }
  ]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Nuevos estados para filtros y ordenamiento
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [orden, setOrden] = useState<'nombre-asc' | 'nombre-desc' | 'fecha-asc' | 'fecha-desc'>('nombre-asc');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    if (editandoId) {
      setCategorias(categorias.map(cat =>
        cat.id === editandoId ? { ...cat, nombre, estado } : cat
      ));
      setEditandoId(null);
    } else {
      setCategorias([...categorias, {
        id: Date.now(),
        nombre,
        estado,
        fecha: new Date().toISOString().split('T')[0],
        productos: 0
      }]);
    }

    setNombre('');
    setEstado('Activo');
  };

  const handleEliminar = (id: number) => {
    setCategorias(categorias.filter(cat => cat.id !== id));
  };

  // Función de filtrado y ordenamiento actualizada
  const filteredCategorias = categorias
    .filter(cat => {
      const matchesSearch =
        cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.estado.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEstado =
        filtroEstado === 'Todos' ||
        cat.estado === filtroEstado;

      return matchesSearch && matchesEstado;
    })
    .sort((a, b) => {
      switch (orden) {
        case 'nombre-asc':
          return a.nombre.localeCompare(b.nombre);
        case 'nombre-desc':
          return b.nombre.localeCompare(a.nombre);
        case 'fecha-asc':
          return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        case 'fecha-desc':
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categorías Principales</h1>
            <p className="text-gray-500 mt-1">Gestiona las categorías base de tu inventario</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Botón de Filtros con Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <Command>
                  <CommandGroup heading="Filtrar por estado">
                    <CommandItem
                      onSelect={() => setFiltroEstado('Todos')}
                      className={`cursor-pointer ${filtroEstado === 'Todos' ? 'bg-gray-100' : ''}`}
                    >
                      Todos los estados
                    </CommandItem>
                    <CommandItem
                      onSelect={() => setFiltroEstado('Activo')}
                      className={`cursor-pointer ${filtroEstado === 'Activo' ? 'bg-gray-100' : ''}`}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Activo
                    </CommandItem>
                    <CommandItem
                      onSelect={() => setFiltroEstado('Inactivo')}
                      className={`cursor-pointer ${filtroEstado === 'Inactivo' ? 'bg-gray-100' : ''}`}
                    >
                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                      Inactivo
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Botón de Ordenar con Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Ordenar
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <Command>
                  <CommandGroup heading="Ordenar por">
                    <CommandItem
                      onSelect={() => setOrden('nombre-asc')}
                      className={`cursor-pointer ${orden === 'nombre-asc' ? 'bg-gray-100' : ''}`}
                    >
                      Nombre (A-Z)
                    </CommandItem>
                    <CommandItem
                      onSelect={() => setOrden('nombre-desc')}
                      className={`cursor-pointer ${orden === 'nombre-desc' ? 'bg-gray-100' : ''}`}
                    >
                      Nombre (Z-A)
                    </CommandItem>
                    <CommandItem
                      onSelect={() => setOrden('fecha-asc')}
                      className={`cursor-pointer ${orden === 'fecha-asc' ? 'bg-gray-100' : ''}`}
                    >
                      Fecha (Antiguas)
                    </CommandItem>
                    <CommandItem
                      onSelect={() => setOrden('fecha-desc')}
                      className={`cursor-pointer ${orden === 'fecha-desc' ? 'bg-gray-100' : ''}`}
                    >
                      Fecha (Recientes)
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Categorías</p>
                  <h3 className="text-2xl font-bold mt-1">{categorias.length}</h3>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <CategoriaIcono categoria="Default" className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Activas</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {categorias.filter(c => c.estado === 'Activo').length}
                  </h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Inactivas</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {categorias.filter(c => c.estado === 'Inactivo').length}
                  </h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form and List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Card */}
          <Card className="lg:col-span-1 bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                {editandoId ? (
                  <>
                    <Edit2 className="h-5 w-5 text-indigo-600" />
                    Editar Categoría
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-indigo-600" />
                    Nueva Categoría
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {editandoId ? 'Actualiza los datos de la categoría' : 'Completa el formulario para agregar'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nombre</label>
                  <Input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Tecnología"
                    className="bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 shadow-lg">
                      <SelectItem value="Activo" className="hover:bg-gray-50">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          Activo
                        </div>
                      </SelectItem>
                      <SelectItem value="Inactivo" className="hover:bg-gray-50">
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                          Inactivo
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-2">
                  {editandoId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNombre('');
                        setEstado('Activo');
                        setEditandoId(null);
                      }}
                      className="w-full border-gray-300 hover:bg-gray-50"
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white ${
                      editandoId ? 'bg-indigo-700 hover:bg-indigo-800' : ''
                    }`}
                  >
                    {editandoId ? 'Actualizar' : 'Agregar'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* List Card - Aquí están las correcciones principales */}
          <Card className="lg:col-span-2 bg-white border-none shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-semibold">Listado de Categorías</CardTitle>
                  <CardDescription>
                    {filteredCategorias.length} de {categorias.length} categorías
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredCategorias.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">No se encontraron categorías</div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm('');
                      setFiltroEstado('Todos');
                    }}
                    className="text-indigo-600 hover:bg-indigo-50"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredCategorias.map((categoria) => (
                    <div key={categoria.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
                            <CategoriaIcono categoria={['Electrónica', 'Ropa', 'Hogar'].includes(categoria.nombre) ? categoria.nombre as 'Electrónica' | 'Ropa' | 'Hogar' : 'Default'} className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{categoria.nombre}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                                {categoria.productos} productos
                              </Badge>
                              <Badge
                                variant={categoria.estado === 'Activo' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {categoria.estado}
                              </Badge>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                Creada: {new Date(categoria.fecha).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2 self-end sm:self-auto mt-2 sm:mt-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setNombre(categoria.nombre);
                                    setEstado(categoria.estado);
                                    setEditandoId(categoria.id);
                                  }}
                                  className="text-indigo-600 hover:bg-indigo-50 h-8 w-8 sm:h-8 sm:w-8"
                                >
                                  <Edit2 className="h-4 w-4" />
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
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEliminar(categoria.id)}
                                  className="text-red-600 hover:bg-red-50 h-8 w-8 sm:h-8 sm:w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Eliminar categoría</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoriasPrincipales;
