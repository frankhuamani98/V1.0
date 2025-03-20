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
import { Calendar, Wrench, Search, Download, ChevronDown } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar reparaciones según búsqueda, técnico y fecha
  const reparacionesFiltradas = reparaciones.filter((reparacion) => {
    const matchesSearch =
      reparacion.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reparacion.servicio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTecnico = selectedTecnico ? reparacion.tecnico === selectedTecnico : true;
    const matchesDate = selectedDate ? reparacion.fecha === selectedDate : true;
    return matchesSearch && matchesTecnico && matchesDate;
  });

  // Función para exportar historial (simulación)
  const exportarHistorial = () => {
    alert("Exportando historial... (Funcionalidad simulada)");
  };

  // Estados para mostrar badges de colores
  const getBadgeClass = (estado: string) => {
    switch (estado) {
      case "Completada":
        return "bg-green-100 text-green-800 border-green-300";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "En Proceso":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "";
    }
  };

  // Manejo de la limpieza del filtro de técnico
  const handleTecnicoChange = (value: string) => {
    // Si es "todos", establecer como undefined
    setSelectedTecnico(value === "todos" ? undefined : value);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-full">
      <Card className="w-full shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl md:text-2xl flex items-center">
            <Wrench className="inline-block mr-2 h-5 w-5 md:h-6 md:w-6" /> Historial de Reparaciones
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Consulta todas las reparaciones realizadas en el taller.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Búsqueda y toggles de filtros responsive */}
          <div className="flex flex-col space-y-3 mb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por cliente o servicio"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full text-sm"
              />
            </div>
            
            <div className="flex justify-between items-center w-full">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs md:text-sm flex items-center"
              >
                <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </Button>
              
              <Button 
                className="ml-auto bg-blue-600 text-white hover:bg-blue-700 text-xs md:text-sm" 
                size="sm"
                onClick={exportarHistorial}
              >
                <Download className="h-4 w-4 mr-1" /> Exportar
              </Button>
            </div>
            
            {/* Filtros expandibles */}
            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedTecnico || "todos"} onValueChange={handleTecnicoChange}>
                  <SelectTrigger className="w-full sm:w-56 text-sm">
                    <SelectValue placeholder="Filtrar por técnico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los técnicos</SelectItem>
                    {Array.from(new Set(reparaciones.map((r) => r.tecnico))).map((tecnico) => (
                      <SelectItem key={tecnico} value={tecnico}>
                        {tecnico}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="relative w-full sm:w-40">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-9 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tabla en pantallas medianas y grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">ID</TableHead>
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
                      <TableCell className="font-medium">{reparacion.id}</TableCell>
                      <TableCell>{reparacion.tecnico}</TableCell>
                      <TableCell>{reparacion.cliente}</TableCell>
                      <TableCell>{reparacion.servicio}</TableCell>
                      <TableCell>{reparacion.fecha}</TableCell>
                      <TableCell>
                        <Badge className={getBadgeClass(reparacion.estado)} variant="outline">
                          {reparacion.estado}
                        </Badge>
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
          <div className="sm:hidden space-y-3 mt-4">
            {reparacionesFiltradas.length > 0 ? (
              reparacionesFiltradas.map((reparacion) => (
                <div key={reparacion.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{reparacion.tecnico}</p>
                    <Badge className={`${getBadgeClass(reparacion.estado)} text-xs`} variant="outline">
                      {reparacion.estado}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <p><span className="font-medium">ID:</span> {reparacion.id}</p>
                    <p><span className="font-medium">Fecha:</span> {reparacion.fecha}</p>
                    <p className="col-span-2"><span className="font-medium">Cliente:</span> {reparacion.cliente}</p>
                    <p className="col-span-2"><span className="font-medium">Servicio:</span> {reparacion.servicio}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4 text-sm text-gray-500">
                No se encontraron reparaciones.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialReparaciones;