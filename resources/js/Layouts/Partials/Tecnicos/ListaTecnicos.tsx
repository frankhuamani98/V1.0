import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ChevronUp, ChevronDown, Wrench, Search, UserPlus } from "lucide-react";

interface Tecnico {
  id: number;
  nombre: string;
  especialidad: string;
  estado: "Disponible" | "Ocupado" | "No Disponible";
}

const ListaTecnicos = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([
    { id: 1, nombre: "Juan Pérez", especialidad: "Frenos", estado: "Disponible" },
    { id: 2, nombre: "Carlos Rodríguez", especialidad: "Motor", estado: "Ocupado" },
    { id: 3, nombre: "Luis García", especialidad: "Suspensión", estado: "No Disponible" },
    { id: 4, nombre: "Pedro Gómez", especialidad: "Cambio de aceite", estado: "Disponible" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredTecnicos = tecnicos.filter((tecnico) => {
    const matchesSearch =
      tecnico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecnico.especialidad.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? tecnico.estado === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const sortedTecnicos = [...filteredTecnicos].sort((a, b) => {
    return sortOrder === "asc" ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
  });

  const actualizarEstado = (id: number, nuevoEstado: "Disponible" | "Ocupado" | "No Disponible") => {
    setTecnicos((prevTecnicos) =>
      prevTecnicos.map((tecnico) =>
        tecnico.id === id ? { ...tecnico, estado: nuevoEstado } : tecnico
      )
    );
  };

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Disponible":
        return "default";
      case "Ocupado":
        return "secondary";
      case "No Disponible":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Wrench className="inline-block mr-2 h-6 w-6" /> Gestión de Técnicos
          </CardTitle>
          <CardDescription>Administra los técnicos del taller y su disponibilidad.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o especialidad"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="Ocupado">Ocupado</SelectItem>
                <SelectItem value="No Disponible">No Disponible</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Ordenar {sortOrder === "asc" ? <ChevronUp className="h-4 w-4 inline-block" /> : <ChevronDown className="h-4 w-4 inline-block" />}
            </Button>

            <Button className="ml-auto bg-blue-600 text-white hover:bg-blue-700">
              <UserPlus className="h-5 w-5 mr-2" /> Agregar Técnico
            </Button>
          </div>

          {/* Tabla para pantallas grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Actualizar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTecnicos.map((tecnico) => (
                  <TableRow key={tecnico.id}>
                    <TableCell>{tecnico.id}</TableCell>
                    <TableCell>{tecnico.nombre}</TableCell>
                    <TableCell>{tecnico.especialidad}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(tecnico.estado)}>{tecnico.estado}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select value={tecnico.estado} onValueChange={(nuevoEstado) => actualizarEstado(tecnico.id, nuevoEstado as "Disponible" | "Ocupado" | "No Disponible")}>
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Disponible">Disponible</SelectItem>
                          <SelectItem value="Ocupado">Ocupado</SelectItem>
                          <SelectItem value="No Disponible">No Disponible</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas para móviles */}
          <div className="sm:hidden space-y-4">
            {sortedTecnicos.map((tecnico) => (
              <div key={tecnico.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-medium">{tecnico.nombre}</p>
                <p className="text-sm"><strong>Especialidad:</strong> {tecnico.especialidad}</p>
                <Badge variant={getBadgeVariant(tecnico.estado)}>{tecnico.estado}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListaTecnicos;
