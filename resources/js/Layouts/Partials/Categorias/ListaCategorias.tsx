import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

const Subcategorias = () => {
  const [nombre, setNombre] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [subcategorias, setSubcategorias] = useState([
    {
      id: 1,
      nombre: 'Smartphones',
      categoria: 'Electrónica',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'Laptops',
      categoria: 'Electrónica',
      estado: 'Activo'
    }
  ]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categorias = [
    { id: '1', nombre: 'Electrónica' },
    { id: '2', nombre: 'Ropa' },
    { id: '3', nombre: 'Hogar' }
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
        estado
      }]);
    }

    setNombre('');
    setCategoriaId('');
    setEstado('Activo');
  };

  const handleEliminar = (id: number) => {
    setSubcategorias(subcategorias.filter(sub => sub.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Subcategorías</h1>
        <div className="h-px w-20 bg-blue-500 mx-auto mb-6"></div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-xl font-medium text-gray-800">
            {editandoId ? 'Editar Subcategoría' : 'Agregar Nueva Subcategoría'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre de la subcategoría</label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Smartphones"
                className="border-gray-300 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Categoría principal</label>
              <Select value={categoriaId} onValueChange={setCategoriaId}>
                <SelectTrigger className="border-gray-300 focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger className="border-gray-300 focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              {editandoId ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-medium text-gray-800">Subcategorías Registradas</CardTitle>
            <span className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
              {subcategorias.length} subcategorías
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {subcategorias.map((subcategoria) => (
              <div
                key={subcategoria.id}
                className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setHoveredId(subcategoria.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div>
                  <p className="font-medium text-gray-800">{subcategoria.nombre}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Categoría: {subcategoria.categoria}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    subcategoria.estado === 'Activo'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {subcategoria.estado}
                  </span>
                  {(hoveredId === subcategoria.id || editandoId === subcategoria.id) && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNombre(subcategoria.nombre);
                          setCategoriaId(
                            categorias.find(c => c.nombre === subcategoria.categoria)?.id || ''
                          );
                          setEstado(subcategoria.estado);
                          setEditandoId(subcategoria.id);
                        }}
                        className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEliminar(subcategoria.id)}
                        className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
