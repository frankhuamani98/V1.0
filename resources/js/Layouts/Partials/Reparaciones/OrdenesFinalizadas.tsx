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
import { Calendar, ClipboardCheck, Search, Download } from "lucide-react";

interface Orden {
  id: number;
  cliente: string;
  servicio: string;
  estado: "Completada";
  fechaFinalizacion: string;
}

const OrdenesFinalizadas = () => {
  const [ordenes] = useState<Orden[]>([
    { id: 1, cliente: "Juan Pérez", servicio: "Cambio de aceite", estado: "Completada", fechaFinalizacion: "2024-03-20" },
    { id: 2, cliente: "Carlos López", servicio: "Revisión de frenos", estado: "Completada", fechaFinalizacion: "2024-03-22" },
    { id: 3, cliente: "Ana Ramírez", servicio: "Diagnóstico general", estado: "Completada", fechaFinalizacion: "2024-03-25" },
    { id: 4, cliente: "Diego Fernández", servicio: "Cambio de pastillas de freno", estado: "Completada", fechaFinalizacion: "2024-03-27" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const ordenesFiltradas = ordenes.filter((orden) => {
    const matchesSearch =
      orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.servicio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate ? orden.fechaFinalizacion === selectedDate : true;

    return matchesSearch && matchesDate;
  });

  const exportarDatos = () => {
    alert("Exportando datos... (Funcionalidad simulada)");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <ClipboardCheck className="inline-block mr-2 h-6 w-6" /> Órdenes Finalizadas
          </CardTitle>
          <CardDescription>Consulta todas las reparaciones completadas en el taller.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barra de búsqueda y filtro por fecha */}
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

            <div className="relative w-full sm:w-40">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700" onClick={exportarDatos}>
              <Download className="h-5 w-5 mr-2" /> Exportar
            </Button>
          </div>

          {/* Tabla en pantallas grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha de Finalización</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.length > 0 ? (
                  ordenesFiltradas.map((orden) => (
                    <TableRow key={orden.id}>
                      <TableCell>{orden.id}</TableCell>
                      <TableCell>{orden.cliente}</TableCell>
                      <TableCell>{orden.servicio}</TableCell>
                      <TableCell>{orden.fechaFinalizacion}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{orden.estado}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center p-4">
                      No se encontraron órdenes finalizadas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas en móviles */}
          <div className="sm:hidden grid gap-4 mt-4">
            {ordenesFiltradas.length > 0 ? (
              ordenesFiltradas.map((orden) => (
                <div key={orden.id} className="bg-white rounded-lg shadow-md p-4">
                  <p className="font-medium">{orden.cliente}</p>
                  <p className="text-sm"><strong>Servicio:</strong> {orden.servicio}</p>
                  <p className="text-sm"><strong>Fecha:</strong> {orden.fechaFinalizacion}</p>
                  <Badge variant="outline">{orden.estado}</Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No se encontraron órdenes finalizadas.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdenesFinalizadas;
