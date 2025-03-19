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
import { Calendar, Wrench, Search, Download } from "lucide-react";

interface Reparacion {
  id: number;
  tecnico: string;
  cliente: string;
  servicio: string;
  estado: "Completada" | "Pendiente" | "En Proceso";
  fecha: string;
}

const HistorialReparaciones = () => {
  const [reparaciones] = useState<Reparacion[]>([
    { id: 1, tecnico: "Juan Pérez", cliente: "Carlos Ramírez", servicio: "Cambio de aceite", estado: "Completada", fecha: "2024-03-20" },
    { id: 2, tecnico: "Luis García", cliente: "Ana López", servicio: "Revisión de frenos", estado: "Pendiente", fecha: "2024-03-22" },
    { id: 3, tecnico: "Pedro Gómez", cliente: "Diego Fernández", servicio: "Diagnóstico general", estado: "En Proceso", fecha: "2024-03-25" },
    { id: 4, tecnico: "Carlos Rodríguez", cliente: "Sofía Martínez", servicio: "Cambio de pastillas de freno", estado: "Completada", fecha: "2024-03-27" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTecnico, setSelectedTecnico] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const reparacionesFiltradas = reparaciones.filter((reparacion) => {
    const matchesSearch =
      reparacion.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reparacion.servicio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTecnico = selectedTecnico ? reparacion.tecnico === selectedTecnico : true;
    const matchesDate = selectedDate ? reparacion.fecha === selectedDate : true;

    return matchesSearch && matchesTecnico && matchesDate;
  });

  const exportarHistorial = () => {
    alert("Exportando historial... (Funcionalidad simulada)");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <Wrench className="inline-block mr-2 h-6 w-6" /> Historial de Reparaciones
          </CardTitle>
          <CardDescription>Consulta todas las reparaciones realizadas en el taller.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Búsqueda y filtros */}
          <div className="flex flex-wrap gap-4 mb-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por cliente o servicio"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedTecnico} onValueChange={setSelectedTecnico}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="Filtrar por técnico" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(reparaciones.map((r) => r.tecnico))).map((tecnico) => (
                  <SelectItem key={tecnico} value={tecnico}>
                    {tecnico}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-40">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700" onClick={exportarHistorial}>
              <Download className="h-5 w-5 mr-2" /> Exportar
            </Button>
          </div>

          {/* Tabla en pantallas grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reparacionesFiltradas.length > 0 ? (
                  reparacionesFiltradas.map((reparacion) => (
                    <TableRow key={reparacion.id}>
                      <TableCell>{reparacion.id}</TableCell>
                      <TableCell>{reparacion.tecnico}</TableCell>
                      <TableCell>{reparacion.cliente}</TableCell>
                      <TableCell>{reparacion.servicio}</TableCell>
                      <TableCell>{reparacion.fecha}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{reparacion.estado}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center p-4">
                      No se encontraron reparaciones.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas en móviles */}
          <div className="sm:hidden grid gap-4 mt-4">
            {reparacionesFiltradas.map((reparacion) => (
              <div key={reparacion.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-medium">{reparacion.tecnico}</p>
                <p className="text-sm"><strong>Cliente:</strong> {reparacion.cliente}</p>
                <p className="text-sm"><strong>Servicio:</strong> {reparacion.servicio}</p>
                <p className="text-sm"><strong>Fecha:</strong> {reparacion.fecha}</p>
                <Badge variant="outline">{reparacion.estado}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialReparaciones;
