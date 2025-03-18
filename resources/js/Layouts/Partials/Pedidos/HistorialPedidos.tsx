import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { ChevronUp, ChevronDown } from "lucide-react";

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Juan Perez", producto: "Laptop", cantidad: 1, fecha: "2023-10-01", estado: "Entregado" },
    { id: 2, cliente: "Maria Gomez", producto: "Smartphone", cantidad: 2, fecha: "2023-10-02", estado: "Cancelado" },
    { id: 3, cliente: "Carlos Ruiz", producto: "Tablet", cantidad: 1, fecha: "2023-10-03", estado: "Entregado" },
    { id: 4, cliente: "Ana Lopez", producto: "Monitor", cantidad: 1, fecha: "2023-10-04", estado: "Entregado" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("Entregado");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtrar pedidos
  const filteredPedidos = pedidos.filter((pedido) => {
    const matchesSearch = pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? pedido.estado === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Ordenar pedidos por fecha
  const sortedPedidos = filteredPedidos.sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pedidos</CardTitle>
          <CardDescription>Aquí puedes ver el historial de pedidos completados o cancelados.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Buscar por cliente"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80"
            />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entregado">Entregado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla de pedidos */}
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">Producto</TableHead>
                  <TableHead className="hidden sm:table-cell">Cantidad</TableHead>
                  <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="sm:hidden">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell className="hidden sm:table-cell">{pedido.id}</TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell className="hidden sm:table-cell">{pedido.producto}</TableCell>
                    <TableCell className="hidden sm:table-cell">{pedido.cantidad}</TableCell>
                    <TableCell className="hidden sm:table-cell">{pedido.fecha}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pedido.estado === "Entregado"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {pedido.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="sm:hidden">
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
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

export default HistorialPedidos;
