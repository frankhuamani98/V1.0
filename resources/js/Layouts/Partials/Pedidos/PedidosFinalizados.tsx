import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const PedidosFinalizados = () => {
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Juan Perez", producto: "Laptop", cantidad: 1, fecha: "2023-10-01", estado: "Entregado", direccion: "Calle 123, Ciudad X", numeroOrden: "ORD-12345" },
    { id: 2, cliente: "Maria Gomez", producto: "Smartphone", cantidad: 2, fecha: "2023-10-02", estado: "Cancelado", direccion: "Avenida 456, Ciudad Y", numeroOrden: "ORD-12346" },
    { id: 3, cliente: "Carlos Ruiz", producto: "Tablet", cantidad: 1, fecha: "2023-10-03", estado: "Entregado", direccion: "Calle 789, Ciudad Z", numeroOrden: "ORD-12347" },
    { id: 4, cliente: "Ana Lopez", producto: "Monitor", cantidad: 1, fecha: "2023-10-04", estado: "Entregado", direccion: "Calle 101, Ciudad A", numeroOrden: "ORD-12348" },
  ]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para expandir/colapsar una fila
  const toggleRow = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  // Filtrado de pedidos según el término de búsqueda
  const filteredPedidos = pedidos.filter(
    (pedido) =>
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Finalizados</CardTitle>
          <CardDescription>
            Aquí puedes ver los pedidos que han sido entregados o cancelados.
          </CardDescription>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar por cliente o producto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md w-full max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          {/* Si no hay pedidos, mostrar mensaje */}
          {filteredPedidos.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No hay pedidos finalizados que coincidan con la búsqueda.</p>
          ) : (
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
                  {filteredPedidos.map((pedido) => (
                    <React.Fragment key={pedido.id}>
                      <TableRow>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleRow(pedido.id)}
                            aria-label="Ver detalles"
                          >
                            {expandedRows.includes(pedido.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Detalles expandibles */}
                      {expandedRows.includes(pedido.id) && (
                        <TableRow className="sm:hidden">
                          <TableCell colSpan={7} className="p-4 bg-muted/50">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">ID:</p>
                                <p className="text-sm">{pedido.id}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Producto:</p>
                                <p className="text-sm">{pedido.producto}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Cantidad:</p>
                                <p className="text-sm">{pedido.cantidad}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Fecha:</p>
                                <p className="text-sm">{pedido.fecha}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Número de Orden:</p>
                                <p className="text-sm">{pedido.numeroOrden}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Dirección:</p>
                                <p className="text-sm">{pedido.direccion}</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PedidosFinalizados;
