import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash, FiPlus } from "react-icons/fi";

interface Tecnico {
  id: number;
  nombre: string;
  especialidad: string;
  estado: "Disponible" | "Ocupado" | "No Disponible";
}

const ListaTecnicos = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([
    { id: 1, nombre: "Juan Pérez", especialidad: "Frenos", estado: "Disponible" },
    { id: 2, nombre: "Carlos Rodríguez", especialidad: "Motor", estado: "Ocupado" },
    { id: 3, nombre: "Luis García", especialidad: "Suspensión", estado: "No Disponible" },
    { id: 4, nombre: "Pedro Gómez", especialidad: "Cambio de aceite", estado: "Disponible" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoTecnico, setNuevoTecnico] = useState<Omit<Tecnico, "id">>({
    nombre: "",
    especialidad: "",
    estado: "Disponible",
  });

  // Filtrar técnicos según búsqueda
  const tecnicosFiltrados = tecnicos.filter((tecnico) =>
    tecnico.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    tecnico.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agregar nuevo técnico
  const agregarTecnico = () => {
    if (nuevoTecnico.nombre && nuevoTecnico.especialidad) {
      setTecnicos([...tecnicos, { ...nuevoTecnico, id: tecnicos.length + 1 }]);
      setModalOpen(false);
      setNuevoTecnico({ nombre: "", especialidad: "", estado: "Disponible" });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Lista de Técnicos</h1>
      <p className="text-gray-600 mb-4">
        Aquí puedes ver y administrar los técnicos registrados en el taller.
      </p>

      {/* Buscador */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar técnico..."
          className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" size={20} />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3 text-left">Nombre</th>
              <th className="border p-3 text-left">Especialidad</th>
              <th className="border p-3 text-left">Estado</th>
              <th className="border p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tecnicosFiltrados.length > 0 ? (
              tecnicosFiltrados.map((tecnico) => (
                <tr key={tecnico.id} className="hover:bg-gray-100">
                  <td className="border p-3">{tecnico.nombre}</td>
                  <td className="border p-3">{tecnico.especialidad}</td>
                  <td
                    className={`border p-3 font-bold ${
                      tecnico.estado === "Disponible"
                        ? "text-green-600"
                        : tecnico.estado === "Ocupado"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {tecnico.estado}
                  </td>
                  <td className="border p-3 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No se encontraron técnicos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón flotante para agregar técnico */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <FiPlus size={24} />
      </button>

      {/* Modal para agregar técnico */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Agregar Técnico</h2>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-2 mb-3 border rounded-md"
              value={nuevoTecnico.nombre}
              onChange={(e) => setNuevoTecnico({ ...nuevoTecnico, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Especialidad"
              className="w-full p-2 mb-3 border rounded-md"
              value={nuevoTecnico.especialidad}
              onChange={(e) => setNuevoTecnico({ ...nuevoTecnico, especialidad: e.target.value })}
            />
            <select
              className="w-full p-2 mb-3 border rounded-md"
              value={nuevoTecnico.estado}
              onChange={(e) =>
                setNuevoTecnico({
                  ...nuevoTecnico,
                  estado: e.target.value as "Disponible" | "Ocupado" | "No Disponible",
                })
              }
            >
              <option value="Disponible">Disponible</option>
              <option value="Ocupado">Ocupado</option>
              <option value="No Disponible">No Disponible</option>
            </select>
            <button
              onClick={agregarTecnico}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full p-2 mt-2 text-gray-600 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaTecnicos;
