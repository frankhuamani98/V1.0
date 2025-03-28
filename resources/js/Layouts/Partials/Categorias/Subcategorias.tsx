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

// Componente premium de iconos para categorías
const CategoriaIcono = ({ categoria, className = "" }: { categoria: 'Electrónica' | 'Ropa' | 'Hogar' | 'Deportes' | 'Default'; className?: string }) => {
  const iconos: Record<'Electrónica' | 'Ropa' | 'Hogar' | 'Deportes' | 'Default', JSX.Element> = {
    'Electrónica': (
      <svg className={`${className} text-blue-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    'Ropa': (
      <svg className={`${className} text-green-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
      </svg>
    ),
    'Hogar': (
      <svg className={`${className} text-yellow-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l10 10H2z" />
      </svg>
    ),
    'Deportes': (
      <svg className={`${className} text-red-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
    'Default': (
      <svg className={`${className} text-gray-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5v14" />
      </svg>
    )
  };

  return iconos[categoria];
};

// Componente premium de iconos para subcategorías
const SubcategoriaIcono = ({ subcategoria, className = "" }: { subcategoria: 'Smartphones' | 'Laptops' | 'Muebles' | 'Default'; className?: string }) => {
  const iconos: Record<'Smartphones' | 'Laptops' | 'Muebles' | 'Default', JSX.Element> = {
    'Smartphones': (
      <svg className={`${className} text-blue-500 hover:rotate-12 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    'Laptops': (
      <svg className={`${className} text-purple-600 hover:rotate-12 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    'Muebles': (
      <svg className={`${className} text-amber-800 hover:rotate-12 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    'Default': (
      <svg className={`${className} text-gray-500 hover:rotate-12 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  };

  return iconos[subcategoria] || iconos['Default'];
};

const Subcategorias = () => {
  const [nombre, setNombre] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [searchTerm, setSearchTerm] = useState('');
  const [subcategorias, setSubcategorias] = useState([
    {
      id: 1,
      nombre: 'Smartphones',
      categoria: 'Electrónica',
      estado: 'Activo',
      fecha: '2023-05-15',
      productos: 42
    },
    {
      id: 2,
      nombre: 'Laptops',
      categoria: 'Electrónica',
      estado: 'Activo',
      fecha: '2023-06-20',
      productos: 28
    },
    {
      id: 3,
      nombre: 'Muebles',
      categoria: 'Hogar',
      estado: 'Inactivo',
      fecha: '2023-07-10',
      productos: 15
    }
  ]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Estados para filtros y ordenamiento
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');
  const [orden, setOrden] = useState<'nombre-asc' | 'nombre-desc' | 'fecha-asc' | 'fecha-desc'>('nombre-asc');

  const categorias = [
    { id: '1', nombre: 'Electrónica' },
    { id: '2', nombre: 'Ropa' },
    { id: '3', nombre: 'Hogar' },
    { id: '4', nombre: 'Deportes' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !categoriaId) return;

    const categoriaSeleccionada = categorias.find(c => c.id === categoriaId)?.nombre || '';

    if (editandoId) {
      setSubcategorias(subcategorias.map(sub =>
        sub.id === editandoId ? {
          ...sub,
          nombre,
          categoria: categoriaSeleccionada,
          estado
        } : sub
      ));
      setEditandoId(null);
    } else {
      setSubcategorias([...subcategorias, {
        id: Date.now(),
        nombre,
        categoria: categoriaSeleccionada,
        estado,
        fecha: new Date().toISOString().split('T')[0],
        productos: 0
      }]);
    }

    setNombre('');
    setCategoriaId('');
    setEstado('Activo');
  };

  const handleEliminar = (id: number) => {
    setSubcategorias(subcategorias.filter(sub => sub.id !== id));
  };

  // Función de filtrado y ordenamiento
  const filteredSubcategorias = subcategorias
    .filter(sub => {
      const matchesSearch =
        sub.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.categoria.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEstado =
        filtroEstado === 'Todos' ||
        sub.estado === filtroEstado;

      const matchesCategoria =
        filtroCategoria === 'Todas' ||
        sub.categoria === filtroCategoria;

      return matchesSearch && matchesEstado && matchesCategoria;
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Subcategorías</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Organiza tus productos en subcategorías</p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar subcategorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base h-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Filtro por Estado */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-9 px-3">
                    <CheckCircle2 className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Estado</span>
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

              {/* Filtro por Categoría */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-9 px-3">
                    <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Categoría</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <Command>
                    <CommandGroup heading="Filtrar por categoría">
                      <CommandItem
                        onSelect={() => setFiltroCategoria('Todas')}
                        className={`cursor-pointer ${filtroCategoria === 'Todas' ? 'bg-gray-100' : ''}`}
                      >
                        Todas las categorías
                      </CommandItem>
                      {categorias.map((cat) => (
                        <CommandItem
                          key={cat.id}
                          onSelect={() => setFiltroCategoria(cat.nombre)}
                          className={`cursor-pointer ${filtroCategoria === cat.nombre ? 'bg-gray-100' : ''}`}
                        >
                          <CategoriaIcono categoria={cat.nombre as 'Electrónica' | 'Ropa' | 'Hogar' | 'Deportes' | 'Default'} className="h-4 w-4 mr-2" />
                          {cat.nombre}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Ordenar */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-9 px-3">
                    <ArrowUpDown className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Ordenar</span>
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Subcategorías</p>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1">{subcategorias.length}</h3>
                </div>
                <div className="bg-indigo-100 p-2 sm:p-3 rounded-full">
                  <SubcategoriaIcono subcategoria="Default" className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Activas</p>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1">
                    {subcategorias.filter(s => s.estado === 'Activo').length}
                  </h3>
                </div>
                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Inactivas</p>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1">
                    {subcategorias.filter(s => s.estado === 'Inactivo').length}
                  </h3>
                </div>
                <div className="bg-red-100 p-2 sm:p-3 rounded-full">
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form and List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Form Card */}
          <Card className="lg:col-span-1 bg-white border-none shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                {editandoId ? (
                  <>
                    <Edit2 className="h-5 w-5 text-indigo-600" />
                    <span>Editar Subcategoría</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-indigo-600" />
                    <span>Nueva Subcategoría</span>
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {editandoId ? 'Actualiza los datos de la subcategoría' : 'Completa el formulario para agregar'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Nombre</label>
                  <Input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Smartphones"
                    className="bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 h-9 sm:h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Categoría</label>
                  <Select value={categoriaId} onValueChange={setCategoriaId}>
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 h-9 sm:h-10">
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 shadow-lg">
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                          <div className="flex items-center">
                            <CategoriaIcono categoria={categoria.nombre as 'Electrónica' | 'Ropa' | 'Hogar' | 'Deportes' | 'Default'} className="h-4 w-4 mr-2" />
                            {categoria.nombre}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Estado</label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 h-9 sm:h-10">
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 shadow-lg">
                      <SelectItem value="Activo" className="hover:bg-gray-50 text-xs sm:text-sm">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          Activo
                        </div>
                      </SelectItem>
                      <SelectItem value="Inactivo" className="hover:bg-gray-50 text-xs sm:text-sm">
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
                        setCategoriaId('');
                        setEstado('Activo');
                        setEditandoId(null);
                      }}
                      className="w-full border-gray-300 hover:bg-gray-50 h-9 sm:h-10"
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white h-9 sm:h-10 ${
                      editandoId ? 'bg-indigo-700 hover:bg-indigo-800' : ''
                    }`}
                  >
                    {editandoId ? 'Actualizar' : 'Agregar'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* List Card */}
          <Card className="lg:col-span-2 bg-white border-none shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-semibold">Listado de Subcategorías</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {filteredSubcategorias.length} de {subcategorias.length} subcategorías
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredSubcategorias.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">No se encontraron subcategorías</div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm('');
                      setFiltroEstado('Todos');
                      setFiltroCategoria('Todas');
                    }}
                    className="text-indigo-600 hover:bg-indigo-50 text-xs sm:text-sm"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredSubcategorias.map((subcategoria) => (
                    <div key={subcategoria.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="bg-indigo-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                            <SubcategoriaIcono subcategoria={['Smartphones', 'Laptops', 'Muebles'].includes(subcategoria.nombre) ? subcategoria.nombre as 'Smartphones' | 'Laptops' | 'Muebles' : 'Default'} className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{subcategoria.nombre}</h3>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-1">
                              <Badge variant="outline" className="text-[10px] sm:text-xs bg-gray-100 text-gray-600">
                                {subcategoria.productos} productos
                              </Badge>
                              <Badge variant="outline" className="text-[10px] sm:text-xs bg-indigo-50 text-indigo-600">
                                <CategoriaIcono categoria={['Electrónica', 'Hogar', 'Ropa', 'Deportes', 'Default'].includes(subcategoria.categoria) ? subcategoria.categoria as 'Electrónica' | 'Hogar' | 'Ropa' | 'Deportes' | 'Default' : 'Default'} className="h-3 w-3 mr-1" />
                                {subcategoria.categoria}
                              </Badge>
                              <Badge
                                variant={subcategoria.estado === 'Activo' ? 'default' : 'destructive'}
                                className="text-[10px] sm:text-xs"
                              >
                                {subcategoria.estado}
                              </Badge>
                              <span className="text-[10px] sm:text-xs text-gray-500">
                                Creada: {new Date(subcategoria.fecha).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 self-end sm:self-auto">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setNombre(subcategoria.nombre);
                                    setCategoriaId(
                                      categorias.find(c => c.nombre === subcategoria.categoria)?.id || ''
                                    );
                                    setEstado(subcategoria.estado);
                                    setEditandoId(subcategoria.id);
                                  }}
                                  className="text-indigo-600 hover:bg-indigo-50 h-7 w-7 sm:h-8 sm:w-8"
                                >
                                  <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-xs border border-gray-200">
                                <p>Editar subcategoría</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEliminar(subcategoria.id)}
                                  className="text-red-600 hover:bg-red-50 h-7 w-7 sm:h-8 sm:w-8"
                                >
                                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-xs border border-gray-200">
                                <p>Eliminar subcategoría</p>
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

export default Subcategorias;
