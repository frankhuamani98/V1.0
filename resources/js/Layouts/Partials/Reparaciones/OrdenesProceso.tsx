import React, { useState, useMemo } from "react";
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
  CardFooter,
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
import {
  ClipboardList,
  Search,
  CheckCircle,
  Filter,
  Calendar,
  User,
  Wrench,
  AlertCircle,
  XCircle,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Orden {
  id: number;
  cliente: string;
  servicio: string;
  estado: "Pendiente" | "En Proceso" | "Completada";
  fecha: string;
  tecnico?: string;
  prioridad?: "Alta" | "Media" | "Baja";
  notas?: string;
}

const OrdenesProceso = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([
    { id: 1, cliente: "Juan Pérez", servicio: "Cambio de aceite", estado: "Pendiente", fecha: "2024-03-22", tecnico: "Miguel Ruiz", prioridad: "Media", notas: "Cliente solicita revisión de niveles" },
    { id: 2, cliente: "Carlos López", servicio: "Revisión de frenos", estado: "En Proceso", fecha: "2024-03-23", tecnico: "Roberto García", prioridad: "Alta", notas: "Frenos hacen ruido al frenar" },
    { id: 3, cliente: "Ana Ramírez", servicio: "Diagnóstico general", estado: "Pendiente", fecha: "2024-03-24", tecnico: "Miguel Ruiz", prioridad: "Baja" },
    { id: 4, cliente: "Diego Fernández", servicio: "Cambio de pastillas de freno", estado: "En Proceso", fecha: "2024-03-25", tecnico: "Laura Sánchez", prioridad: "Alta", notas: "Urgente - Cliente viaja mañana" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  console.log("Estado inicial de órdenes:", ordenes);

  // Memoized filtered orders
  const ordenesFiltradas = useMemo(() => {
    console.log("Filtrando órdenes con searchTerm:", searchTerm, "selectedStatus:", selectedStatus, "selectedPriority:", selectedPriority);
    return ordenes.filter((orden) => {
      const matchesSearch =
        orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orden.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (orden.tecnico && orden.tecnico.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = selectedStatus ? orden.estado === selectedStatus : true;
      const matchesPriority = selectedPriority ? orden.prioridad === selectedPriority : true;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [ordenes, searchTerm, selectedStatus, selectedPriority]);

  const formatFecha = (fechaStr: string) => {
    try {
      const fecha = new Date(fechaStr);
      return format(fecha, "d 'de' MMMM, yyyy", { locale: es });
    } catch (e) {
      console.error("Error al formatear la fecha:", e);
      return fechaStr;
    }
  };

  const completarOrden = (id: number) => {
    setOrdenes((prevOrdenes) =>
      prevOrdenes.map((orden) =>
        orden.id === id ? { ...orden, estado: "Completada" } : orden
      )
    );
  };

  const toggleExpandOrder = (id: number) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "outline"; // Gris
      case "En Proceso":
        return "secondary"; // Amarillo
      case "Completada":
        return "default"; // Verde
      default:
        return "outline";
    }
  };

  const getPrioridadBadgeVariant = (prioridad: string | undefined) => {
    switch (prioridad) {
      case "Alta":
        return "destructive"; // Rojo
      case "Media":
        return "secondary"; // En lugar de "warning" que no existe
      case "Baja":
        return "available"; // En lugar de "default"
      default:
        return "outline";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Clock className="h-4 w-4 mr-1" />;
      case "En Proceso":
        return <Wrench className="h-4 w-4 mr-1" />;
      case "Completada":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const limpiarFiltros = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedPriority("");
  };

  console.log("Órdenes filtradas:", ordenesFiltradas);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl md:text-2xl flex items-center text-blue-700">
                <ClipboardList className="inline-block mr-2 h-6 w-6" />
                Órdenes en Proceso
              </CardTitle>
              <CardDescription className="mt-1">
                Administra las órdenes de reparación activas en el taller.
              </CardDescription>
            </div>
            <div className="hidden md:block">
              <Badge variant="outline" className="ml-2 font-medium">
                {ordenesFiltradas.length} órdenes
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Filtros y búsqueda */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por cliente, servicio o técnico"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos los estados">Todos los estados</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Completada">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas las prioridades">Todas las prioridades</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabla en pantallas medianas y grandes */}
          <div className="overflow-x-auto hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-14">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.length > 0 ? (
                  ordenesFiltradas.map((orden) => (
                    <TableRow key={orden.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{orden.id}</TableCell>
                      <TableCell>{orden.cliente}</TableCell>
                      <TableCell>{orden.servicio}</TableCell>
                      <TableCell>{orden.tecnico || "-"}</TableCell>
                      <TableCell>{formatFecha(orden.fecha)}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(orden.estado)} className="flex w-fit items-center">
                          {getEstadoIcon(orden.estado)} {orden.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {orden.prioridad && (
                          <Badge variant={getPrioridadBadgeVariant(orden.prioridad)}>
                            {orden.prioridad}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleExpandOrder(orden.id)}
                        >
                          {expandedOrderId === orden.id ? "Ocultar" : "Detalles"}
                        </Button>

                        {orden.estado !== "Completada" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
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
                    <TableCell colSpan={8} className="text-center p-6 text-gray-500">
                      <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                      No se encontraron órdenes con los filtros especificados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas responsive para móviles y tablets pequeñas */}
          <div className="md:hidden grid gap-4">
            {ordenesFiltradas.length > 0 ? (
              ordenesFiltradas.map((orden) => (
                <Card key={orden.id} className="overflow-hidden">
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <h3 className="font-medium">{orden.cliente}</h3>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant={getPrioridadBadgeVariant(orden.prioridad)}>
                          {orden.prioridad || "Normal"}
                        </Badge>
                        <Badge variant={getBadgeVariant(orden.estado)}>{orden.estado}</Badge>
                      </div>
                    </div>

                    <div className="ml-6 text-sm space-y-1">
                      <p><strong>Servicio:</strong> {orden.servicio}</p>
                      {orden.tecnico && <p><strong>Técnico:</strong> {orden.tecnico}</p>}
                      <p className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {formatFecha(orden.fecha)}
                      </p>
                    </div>

                    {expandedOrderId === orden.id && orden.notas && (
                      <div className="mt-2 p-3 bg-slate-50 rounded-md text-sm">
                        <p className="font-medium mb-1">Notas:</p>
                        <p>{orden.notas}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpandOrder(orden.id)}
                      >
                        {expandedOrderId === orden.id ? "Ocultar" : "Detalles"}
                      </Button>

                      {orden.estado !== "Completada" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => completarOrden(orden.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> Completar
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-6 bg-slate-50 rounded-lg">
                <XCircle className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No se encontraron órdenes con los filtros especificados.</p>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={limpiarFiltros}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4 bg-slate-50">
          <div className="text-sm text-gray-500">
            Mostrando {ordenesFiltradas.length} de {ordenes.length} órdenes
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrdenesProceso;
