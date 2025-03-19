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
  CardFooter,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Calendar, ClipboardCheck, Search, Download, Filter, X, FileText } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);
  const [ordenesExportadas, setOrdenesExportadas] = useState<number[]>([]);

  const limpiarFiltros = () => {
    setSearchTerm("");
    setSelectedDate("");
  };

  const ordenesFiltradas = ordenes.filter((orden) => {
    const matchesSearch =
      orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.servicio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? orden.fechaFinalizacion === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  const exportarDatos = () => {
    // Simular exportación y marcar las órdenes como exportadas
    const idsExportados = ordenesFiltradas.map(orden => orden.id);
    setOrdenesExportadas([...ordenesExportadas, ...idsExportados]);
    alert(`Exportando ${ordenesFiltradas.length} órdenes... (Funcionalidad simulada)`);
  };

  const formatearFecha = (fecha: string) => {
    // Convertir formato YYYY-MM-DD a DD/MM/YYYY
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  };

  // Verificar si hay filtros activos
  const hayFiltrosActivos = searchTerm !== "" || selectedDate !== "";

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
      <Card className="w-full shadow-md">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl md:text-2xl flex items-center">
                <ClipboardCheck className="inline-block mr-2 h-5 w-5 md:h-6 md:w-6 text-green-600" /> 
                Órdenes Finalizadas
              </CardTitle>
              <CardDescription className="text-sm md:text-base mt-1">
                Consulta todas las reparaciones completadas en el taller.
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              {ordenesFiltradas.length} órdenes
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Barra de búsqueda principal */}
          <div className="relative w-full mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por cliente o servicio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full text-sm pr-10"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Filtros expandibles */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs md:text-sm flex items-center"
            >
              <Filter className="h-3 w-3 mr-1" />
              Filtros
              {hayFiltrosActivos && <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>}
            </Button>
            
            {hayFiltrosActivos && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={limpiarFiltros}
                className="text-xs md:text-sm text-blue-600 hover:text-blue-800"
              >
                Limpiar filtros
              </Button>
            )}
            
            <Button 
              className="ml-auto bg-blue-600 text-white hover:bg-blue-700 text-xs md:text-sm"
              size="sm"
              onClick={exportarDatos}
              disabled={ordenesFiltradas.length === 0}
            >
              <Download className="h-3 w-3 mr-1" /> 
              Exportar {ordenesFiltradas.length > 0 && `(${ordenesFiltradas.length})`}
            </Button>
          </div>
          
          {showFilters && (
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-3 rounded-md">
              <div className="relative w-full sm:flex-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-9 text-sm w-full"
                  placeholder="Filtrar por fecha"
                />
              </div>
              
              {selectedDate && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDate("")}
                  className="text-xs"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}

          {/* Tabla en pantallas medianas y grandes */}
          <div className="overflow-x-auto hidden sm:block">
            <Table className="min-w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead className="w-32">Fecha de Finalización</TableHead>
                  <TableHead className="w-24">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.length > 0 ? (
                  ordenesFiltradas.map((orden) => (
                    <TableRow key={orden.id} className={ordenesExportadas.includes(orden.id) ? "bg-green-50" : ""}>
                      <TableCell className="font-medium">{orden.id}</TableCell>
                      <TableCell>{orden.cliente}</TableCell>
                      <TableCell>{orden.servicio}</TableCell>
                      <TableCell>{formatearFecha(orden.fechaFinalizacion)}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 border-green-300" variant="outline">
                          {orden.estado}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center p-4 text-gray-500">
                      No se encontraron órdenes finalizadas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas en móviles */}
          <div className="sm:hidden space-y-3 mt-4">
            {ordenesFiltradas.length > 0 ? (
              ordenesFiltradas.map((orden) => (
                <div key={orden.id} className={`bg-white rounded-lg border ${ordenesExportadas.includes(orden.id) ? "border-green-200 bg-green-50" : "border-gray-200"} p-3 shadow-sm`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-green-600 mr-1" />
                      <span className="font-medium text-sm">Orden #{orden.id}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300 text-xs" variant="outline">
                      {orden.estado}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <p className="font-medium text-sm">{orden.cliente}</p>
                    <p className="text-gray-600">{orden.servicio}</p>
                    <div className="flex items-center mt-1 text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatearFecha(orden.fechaFinalizacion)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-gray-500">
                <ClipboardCheck className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No se encontraron órdenes finalizadas.</p>
                {hayFiltrosActivos && (
                  <Button variant="ghost" size="sm" onClick={limpiarFiltros} className="mt-2">
                    Limpiar filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        {ordenesFiltradas.length > 5 && (
          <CardFooter className="flex justify-center pt-2 pb-4 text-sm text-gray-500">
            Mostrando {ordenesFiltradas.length} órdenes completadas
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default OrdenesFinalizadas;