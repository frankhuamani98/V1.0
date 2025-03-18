import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

const EstadoPedidos = () => {
  // Estado para almacenar los pedidos
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Juan Perez", producto: "Laptop", cantidad: 1, fecha: "2023-10-01", estado: "Pendiente" },
    { id: 2, cliente: "Maria Gomez", producto: "Smartphone", cantidad: 2, fecha: "2023-10-02", estado: "Enviado" },
    { id: 3, cliente: "Carlos Ruiz", producto: "Tablet", cantidad: 1, fecha: "2023-10-03", estado: "Entregado" },
    { id: 4, cliente: "Ana Lopez", producto: "Monitor", cantidad: 1, fecha: "2023-10-04", estado: "Cancelado" },
  ]);

  // Función para actualizar el estado de un pedido
  const actualizarEstado = (id: number, nuevoEstado: string) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
      )
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Estado de Pedidos</CardTitle>
          <CardDescription>Aquí puedes ver y actualizar el estado de los pedidos.</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell className="hidden sm:table-cell">{pedido.id}</TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell className="hidden sm:table-cell">{pedido.producto}</TableCell>
                    <TableCell className="hidden sm:table-cell">{pedido.cantidad}</TableCell>
                    <TableCell className="hidden sm:table-cell">{pedido.fecha}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pedido.estado === "Pendiente"
                            ? "secondary"
                            : pedido.estado === "Enviado"
                            ? "outline"
                            : pedido.estado === "Entregado"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {pedido.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={pedido.estado}
                        onValueChange={(nuevoEstado) => actualizarEstado(pedido.id, nuevoEstado)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Entregado">Entregado</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
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

export default EstadoPedidos;
