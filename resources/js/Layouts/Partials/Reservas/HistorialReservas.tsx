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
import { ChevronUp, ChevronDown, History, Search } from "lucide-react";

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([
    { id: 1, cliente: "Juan Pérez", moto: "Honda CBR 600", servicio: "Cambio de aceite", fecha: "2024-03-20", estado: "Completada" },
    { id: 2, cliente: "María Gómez", moto: "Yamaha R3", servicio: "Revisión general", fecha: "2024-03-22", estado: "Cancelada" },
    { id: 3, cliente: "Carlos Ruiz", moto: "Suzuki GSX-R750", servicio: "Cambio de frenos", fecha: "2024-03-25", estado: "Completada" },
    { id: 4, cliente: "Ana López", moto: "Kawasaki Ninja 400", servicio: "Diagnóstico", fecha: "2024-03-27", estado: "Completada" },
    { id: 5, cliente: "Luis Ramírez", moto: "BMW S1000RR", servicio: "Pintura y estética", fecha: "2024-03-30", estado: "Cancelada" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("Completada");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtrado de reservas
  const filteredReservas = reservas.filter((reserva) => {
    const matchesSearch =
      reserva.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.moto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? reserva.estado === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Ordenar reservas por fecha
  const sortedReservas = [...filteredReservas].sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Completada":
        return "default";
      case "Cancelada":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle><History className="inline-block mr-2 h-6 w-6" /> Historial de Reservas</CardTitle>
          <CardDescription>Consulta las reservas finalizadas o canceladas en el taller.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            {/* Campo de búsqueda con icono */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por cliente o motocicleta"
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
                <SelectItem value="Completada">Completada</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Ordenar {sortOrder === "asc" ? <ChevronUp className="h-4 w-4 inline-block" /> : <ChevronDown className="h-4 w-4 inline-block" />}
            </Button>
          </div>

          {/* Tabla de reservas */}
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">Motocicleta</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReservas.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell>{reserva.id}</TableCell>
                    <TableCell>{reserva.cliente}</TableCell>
                    <TableCell className="hidden sm:table-cell">{reserva.moto}</TableCell>
                    <TableCell>{reserva.servicio}</TableCell>
                    <TableCell className="hidden sm:table-cell">{reserva.fecha}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(reserva.estado)}>{reserva.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialReservas;