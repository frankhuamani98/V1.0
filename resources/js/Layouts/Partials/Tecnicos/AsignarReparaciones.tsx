import React, { useState } from "react";
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
import {
  ClipboardList,
  UserCheck,
  Wrench,
  Trash2,
} from "lucide-react";

interface Tecnico {
  id: number;
  nombre: string;
  estado: "Disponible" | "Ocupado" | "No Disponible";
}

interface Reparacion {
  id: number;
  descripcion: string;
}

interface Asignacion {
  id: number;
  tecnico: Tecnico;
  reparacion: Reparacion;
}

const AsignarReparaciones = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([
    { id: 1, nombre: "Juan Pérez", estado: "Disponible" },
    { id: 2, nombre: "Carlos Rodríguez", estado: "Ocupado" },
    { id: 3, nombre: "Luis García", estado: "Disponible" },
    { id: 4, nombre: "Pedro Gómez", estado: "No Disponible" },
  ]);

  const [reparaciones, setReparaciones] = useState<Reparacion[]>([
    { id: 1, descripcion: "Cambio de aceite" },
    { id: 2, descripcion: "Revisión de frenos" },
    { id: 3, descripcion: "Ajuste de suspensión" },
    { id: 4, descripcion: "Diagnóstico general" },
  ]);

  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<string | undefined>(undefined);
  const [reparacionSeleccionada, setReparacionSeleccionada] = useState<string | undefined>(undefined);

  const asignarReparacion = () => {
    const tecnico = tecnicos.find((t) => t.id.toString() === tecnicoSeleccionado);
    const reparacion = reparaciones.find((r) => r.id.toString() === reparacionSeleccionada);

    if (tecnico && reparacion) {
      setAsignaciones([
        ...asignaciones,
        { id: asignaciones.length + 1, tecnico, reparacion },
      ]);

      // Limpiar selección
      setTecnicoSeleccionado(undefined);
      setReparacionSeleccionada(undefined);
    }
  };

  const eliminarAsignacion = (id: number) => {
    setAsignaciones(asignaciones.filter((a) => a.id !== id));
  };

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <UserCheck className="inline-block mr-2 h-6 w-6" /> Asignar Reparaciones
          </CardTitle>
          <CardDescription>Selecciona un técnico disponible y asigna una reparación.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Selección de técnico y reparación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Select value={tecnicoSeleccionado} onValueChange={setTecnicoSeleccionado}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un Técnico" />
              </SelectTrigger>
              <SelectContent>
                {tecnicos
                  .filter((t) => t.estado === "Disponible")
                  .map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.nombre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={reparacionSeleccionada} onValueChange={setReparacionSeleccionada}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una Reparación" />
              </SelectTrigger>
              <SelectContent>
                {reparaciones.map((r) => (
                  <SelectItem key={r.id} value={r.id.toString()}>
                    {r.descripcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón para asignar */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={asignarReparacion} disabled={!tecnicoSeleccionado || !reparacionSeleccionada}>
            Asignar Reparación
          </Button>

          {/* Lista de asignaciones */}
          {asignaciones.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6">Asignaciones Recientes</h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-3 text-left">Técnico</th>
                      <th className="border p-3 text-left">Reparación</th>
                      <th className="border p-3 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignaciones.map((asignacion) => (
                      <tr key={asignacion.id} className="hover:bg-gray-50">
                        <td className="border p-3">{asignacion.tecnico.nombre}</td>
                        <td className="border p-3">{asignacion.reparacion.descripcion}</td>
                        <td className="border p-3">
                          <Button
                            variant="destructive"
                            className="px-2 py-1"
                            onClick={() => eliminarAsignacion(asignacion.id)}
                          >
                            <Trash2 className="h-4 w-4 inline-block" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Vista en tarjetas para móviles */}
          <div className="sm:hidden space-y-4 mt-4">
            {asignaciones.map((asignacion) => (
              <div key={asignacion.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-medium">{asignacion.tecnico.nombre}</p>
                <p className="text-sm"><strong>Reparación:</strong> {asignacion.reparacion.descripcion}</p>
                <Button
                  variant="destructive"
                  className="w-full mt-2"
                  onClick={() => eliminarAsignacion(asignacion.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsignarReparaciones;
