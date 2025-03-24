import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

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
};

export default CategoriasPrincipales;
