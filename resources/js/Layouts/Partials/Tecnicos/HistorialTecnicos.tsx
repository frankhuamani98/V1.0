import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Wrench, Search } from "lucide-react";

interface Reparacion {
  id: number;
  tecnicoId: number;
  tecnico: string;
  cliente: string;
  servicio: string;
  fecha: string;
}

interface Tecnico {
  id: number;
  nombre: string;
}

const HistorialTecnicos = () => {
  const [tecnicos] = useState<Tecnico[]>([
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "Carlos Rodríguez" },
    { id: 3, nombre: "Luis García" },
    { id: 4, nombre: "Pedro Gómez" },
  ]);

  const [reparaciones] = useState<Reparacion[]>([
    { id: 1, tecnicoId: 1, tecnico: "Juan Pérez", cliente: "María López", servicio: "Cambio de aceite", fecha: "2024-03-10" },
    { id: 2, tecnicoId: 2, tecnico: "Carlos Rodríguez", cliente: "Pedro Ramírez", servicio: "Revisión de frenos", fecha: "2024-03-12" },
    { id: 3, tecnicoId: 1, tecnico: "Juan Pérez", cliente: "Ana González", servicio: "Ajuste de suspensión", fecha: "2024-03-15" },
    { id: 4, tecnicoId: 3, tecnico: "Luis García", cliente: "Diego Fernández", servicio: "Diagnóstico general", fecha: "2024-03-18" },
    { id: 5, tecnicoId: 2, tecnico: "Carlos Rodríguez", cliente: "Sofía Martínez", servicio: "Cambio de pastillas de freno", fecha: "2024-03-20" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTecnico, setSelectedTecnico] = useState<string | undefined>(undefined);

  // Filtrar reparaciones según búsqueda y técnico seleccionado
  const reparacionesFiltradas = reparaciones.filter((reparacion) => {
    const matchesSearch =
      reparacion.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reparacion.servicio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTecnico = selectedTecnico ? reparacion.tecnicoId.toString() === selectedTecnico : true;

    return matchesSearch && matchesTecnico;
  });

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Wrench className="inline-block mr-2 h-6 w-6" /> Historial de Reparaciones por Técnico
          </CardTitle>
          <CardDescription>Consulta las reparaciones realizadas por cada técnico.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Búsqueda y filtro por técnico */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por cliente o servicio"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            <Select value={selectedTecnico} onValueChange={setSelectedTecnico}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="Filtrar por técnico" />
              </SelectTrigger>
              <SelectContent>
                {tecnicos.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    {t.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabla en pantallas grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reparacionesFiltradas.length > 0 ? (
                  reparacionesFiltradas.map((reparacion) => (
                    <TableRow key={reparacion.id}>
                      <TableCell>{reparacion.tecnico}</TableCell>
                      <TableCell>{reparacion.cliente}</TableCell>
                      <TableCell>{reparacion.servicio}</TableCell>
                      <TableCell>{reparacion.fecha}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center p-4">
                      No se encontraron reparaciones.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas en móviles */}
          <div className="sm:hidden space-y-4 mt-4">
            {reparacionesFiltradas.map((reparacion) => (
              <div key={reparacion.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-medium">{reparacion.tecnico}</p>
                <p className="text-sm"><strong>Cliente:</strong> {reparacion.cliente}</p>
                <p className="text-sm"><strong>Servicio:</strong> {reparacion.servicio}</p>
                <p className="text-sm"><strong>Fecha:</strong> {reparacion.fecha}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialTecnicos;
