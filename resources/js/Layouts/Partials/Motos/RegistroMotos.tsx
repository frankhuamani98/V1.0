import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PlusCircle, Edit, Trash, MoreVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import axios from 'axios';

interface Moto {
  id: number;
  año: number;
  modelo: string;
  marca: string;
  estado: string;
}

const RegistroMotos = () => {
  const [año, setAño] = useState<number | ''>('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [error, setError] = useState('');
  const [motos, setMotos] = useState<Moto[]>([]);
  const [editandoMoto, setEditandoMoto] = useState<Moto | null>(null);

  // Obtener las motos al cargar el componente
  useEffect(() => {
    fetchMotos();
  }, []);

  // Función para obtener las motos desde la API
  const fetchMotos = async () => {
    try {
      const response = await axios.get('/registro');
      setMotos(response.data.motos);
    } catch (error) {
      console.error('Error al obtener las motos:', error);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!año || !modelo.trim() || !marca.trim()) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (año < 2000) {
      setError('El año debe ser 2000 o superior');
      return;
    }

    const motoData = { año, modelo, marca, estado };

    try {
      if (editandoMoto) {
        // Actualizar una moto existente
        await axios.put(`/registro/${editandoMoto.id}`, motoData);
      } else {
        // Crear una nueva moto
        await axios.post('/registro', motoData);
      }
      fetchMotos(); // Actualizar la lista de motos
      setAño('');
      setModelo('');
      setMarca('');
      setEstado('Activo');
      setEditandoMoto(null);
      setError('');
    } catch (error) {
      console.error('Error al guardar la moto:', error);
      setError('Ocurrió un error al guardar la moto.');
    }
  };

  // Función para manejar la edición de una moto
  const handleEditar = (moto: Moto) => {
    setAño(moto.año);
    setModelo(moto.modelo);
    setMarca(moto.marca);
    setEstado(moto.estado);
    setEditandoMoto(moto);
  };

  // Función para manejar la eliminación de una moto
  const handleEliminar = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta moto?')) {
      try {
        await axios.delete(`/registro/${id}`);
        fetchMotos(); // Actualizar la lista de motos
      } catch (error) {
        console.error('Error al eliminar la moto:', error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Registro de Motos</h1>
      <p className="text-muted-foreground">
        Aquí puedes registrar nuevas motos en el sistema.
      </p>

      {/* Formulario para registrar o editar motos */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            {editandoMoto ? 'Editar Moto' : 'Registrar Nueva Moto'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="año">Año</Label>
              <Input
                id="año"
                type="number"
                value={año}
                onChange={(e) => setAño(Number(e.target.value))}
                placeholder="Ingrese el año de la moto (2000 o superior)"
                className="w-full"
                min={2000}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input
                id="modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ingrese el modelo de la moto"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ingrese la marca de la moto"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
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
              {editandoMoto ? 'Actualizar Moto' : 'Registrar Moto'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de motos registradas */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Motos Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {motos.map((moto) => (
              <div
                key={moto.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Información de la moto */}
                <div className="flex-1">
                  <p className="font-medium">Año: {moto.año}</p>
                  <p className="text-sm text-muted-foreground">Modelo: {moto.modelo}</p>
                  <p className="text-sm text-muted-foreground">Marca: {moto.marca}</p>
                  <p className="text-sm text-muted-foreground">Estado: {moto.estado}</p>
                </div>

                {/* Menú desplegable para acciones */}
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditar(moto)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEliminar(moto.id)}
                        className="text-red-600"
                      >
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

export default RegistroMotos;