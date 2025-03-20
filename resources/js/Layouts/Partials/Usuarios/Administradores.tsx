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
import { Button } from "@/Components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Administradores = () => {
  // Datos de ejemplo para la lista de administradores
  const [admins, setAdmins] = useState([
    {
      id: 1,
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan.perez@example.com",
      phone: "123456789",
      status: "active",
    },
    {
      id: 2,
      first_name: "María",
      last_name: "Gómez",
      email: "maria.gomez@example.com",
      phone: "987654321",
      status: "inactive",
    },
    {
      id: 3,
      first_name: "Carlos",
      last_name: "López",
      email: "carlos.lopez@example.com",
      phone: "555555555",
      status: "pending",
    },
  ]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Función para expandir o contraer filas en móvil
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Función para quitar el rol de administrador (simulación)
  const handleRemoveAdmin = (id: number) => {
    console.log(`Quitar rol de administrador al usuario con ID: ${id}`);
    // Aquí puedes agregar la lógica para actualizar el rol en tu backend
  };

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Administradores</CardTitle>
          <CardDescription>
            Aquí puedes ver la lista de administradores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="hidden sm:table-header-group">
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <React.Fragment key={admin.id}>
                    {/* Diseño de tabla en escritorio */}
                    <TableRow className="sm:table-row hidden">
                      <TableCell>{admin.first_name}</TableCell>
                      <TableCell>{admin.last_name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            admin.status === "active"
                              ? "default"
                              : admin.status === "inactive"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {admin.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveAdmin(admin.id)}
                        >
                          Quitar Admin
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Diseño de tarjeta en móvil */}
                    <div className="sm:hidden bg-white rounded-lg shadow-md p-4 mb-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">
                          {admin.first_name} {admin.last_name}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleRow(admin.id)}
                          aria-label="Ver detalles"
                        >
                          {expandedRows.includes(admin.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {expandedRows.includes(admin.id) && (
                        <div className="mt-2 space-y-2">
                          <p className="text-sm">
                            <strong>Email:</strong> {admin.email}
                          </p>
                          <p className="text-sm">
                            <strong>Teléfono:</strong> {admin.phone}
                          </p>
                          <p className="text-sm">
                            <strong>Estado:</strong>{" "}
                            <Badge
                              variant={
                                admin.status === "active"
                                  ? "default"
                                  : admin.status === "inactive"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {admin.status}
                            </Badge>
                          </p>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => handleRemoveAdmin(admin.id)}
                          >
                            Quitar Admin
                          </Button>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Administradores;