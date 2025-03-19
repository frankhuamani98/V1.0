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
import { ClipboardList, Search, CheckCircle } from "lucide-react";

interface Orden {
  id: number;
  cliente: string;
  servicio: string;
  estado: "Pendiente" | "En Proceso" | "Completada";
  fecha: string;
}

const OrdenesProceso = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([
    { id: 1, cliente: "Juan Pérez", servicio: "Cambio de aceite", estado: "Pendiente", fecha: "2024-03-22" },
    { id: 2, cliente: "Carlos López", servicio: "Revisión de frenos", estado: "En Proceso", fecha: "2024-03-23" },
    { id: 3, cliente: "Ana Ramírez", servicio: "Diagnóstico general", estado: "Pendiente", fecha: "2024-03-24" },
    { id: 4, cliente: "Diego Fernández", servicio: "Cambio de pastillas de freno", estado: "En Proceso", fecha: "2024-03-25" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const ordenesFiltradas = ordenes.filter((orden) => {
    const matchesSearch =
      orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.servicio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus ? orden.estado === selectedStatus : true;

    return matchesSearch && matchesStatus;
  });

  const completarOrden = (id: number) => {
    setOrdenes((prevOrdenes) =>
      prevOrdenes.map((orden) =>
        orden.id === id ? { ...orden, estado: "Completada" } : orden
      )
    );
  };

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "secondary";
      case "En Proceso":
        return "default";
      case "Completada":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <ClipboardList className="inline-block mr-2 h-6 w-6" /> Órdenes en Proceso
          </CardTitle>
          <CardDescription>Administra las órdenes de reparación activas.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barra de búsqueda y filtro por estado */}
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla en pantallas grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.length > 0 ? (
                  ordenesFiltradas.map((orden) => (
                    <TableRow key={orden.id}>
                      <TableCell>{orden.id}</TableCell>
                      <TableCell>{orden.cliente}</TableCell>
                      <TableCell>{orden.servicio}</TableCell>
                      <TableCell>{orden.fecha}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(orden.estado)}>{orden.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        {orden.estado !== "Completada" && (
                          <Button
                            className="px-2 py-1"
                            variant="success"
                            onClick={() => completarOrden(orden.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Completar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center p-4">
                      No se encontraron órdenes.
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
                  <p className="text-sm"><strong>Fecha:</strong> {orden.fecha}</p>
                  <Badge variant={getBadgeVariant(orden.estado)}>{orden.estado}</Badge>
                  {orden.estado !== "Completada" && (
                    <Button
                      variant="success"
                      className="w-full mt-2"
                      onClick={() => completarOrden(orden.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Completar
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No se encontraron órdenes en proceso.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdenesProceso;
