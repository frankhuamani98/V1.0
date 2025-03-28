import React, { useState } from "react";

const SoporteTecnico = () => {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Problema de inicio de sesión", status: "Abierto", priority: "Alta", date: "2023-05-15", category: "Autenticación" },
    { id: 2, title: "Error en la página de perfil", status: "En progreso", priority: "Media", date: "2023-05-16", category: "Perfil de usuario" },
    { id: 3, title: "Solicitud de restablecimiento de contraseña", status: "Cerrado", priority: "Baja", date: "2023-05-10", category: "Seguridad" },
    { id: 4, title: "Problema con reportes de ventas", status: "Abierto", priority: "Alta", date: "2023-05-17", category: "Reportes" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", role: "Usuario", email: "juan@example.com", lastLogin: "2023-05-16" },
    { id: 2, name: "María López", role: "Administrador", email: "maria@example.com", lastLogin: "2023-05-17" },
    { id: 3, name: "Carlos Gómez", role: "Técnico", email: "carlos@example.com", lastLogin: "2023-05-15" },
  ]);

  const [activeTab, setActiveTab] = useState("tickets");
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "Media",
    category: ""
  });

  const handleCreateTicket = () => {
    const ticket = {
      id: tickets.length + 1,
      title: newTicket.title,
      status: "Abierto",
      priority: newTicket.priority,
      date: new Date().toISOString().split('T')[0],
      category: newTicket.category
    };
    setTickets([...tickets, ticket]);
    setNewTicket({ title: "", description: "", priority: "Media", category: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Centro de Soporte Técnico</h1>

      {/* Pestañas de navegación */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === "tickets" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("tickets")}
        >
          Tickets de Soporte
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "users" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("users")}
        >
          Usuarios del Sistema
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "resources" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("resources")}
        >
          Recursos Técnicos
        </button>
      </div>

      {activeTab === "tickets" && (
        <div className="space-y-6">
          {/* Crear nuevo ticket */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows={3}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Autenticación">Autenticación</option>
                    <option value="Perfil de usuario">Perfil de usuario</option>
                    <option value="Reportes">Reportes</option>
                    <option value="Facturación">Facturación</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleCreateTicket}
              >
                Crear Ticket
              </button>
            </div>
          </div>

          {/* Listado de tickets */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tickets de Soporte</h2>
              <div className="text-sm text-gray-600">
                Mostrando {tickets.length} tickets
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.priority === "Alta" ? "bg-red-100 text-red-800" : 
                          ticket.priority === "Media" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-green-100 text-green-800"
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usuarios del Sistema</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último acceso</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Administrador" ? "bg-purple-100 text-purple-800" : 
                        user.role === "Técnico" ? "bg-blue-100 text-blue-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recursos Técnicos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Documentación */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">Documentación Técnica</h3>
              <p className="text-sm text-gray-600 mb-3">Manuales técnicos y guías de implementación</p>
              <button className="text-blue-600 text-sm font-medium">Acceder a documentos</button>
            </div>
            
            {/* API */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">Documentación API</h3>
              <p className="text-sm text-gray-600 mb-3">Guía para integración con otros sistemas</p>
              <button className="text-blue-600 text-sm font-medium">Ver documentación API</button>
            </div>
            
            {/* FAQ */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">Preguntas Frecuentes</h3>
              <p className="text-sm text-gray-600 mb-3">Soluciones a problemas comunes</p>
              <button className="text-blue-600 text-sm font-medium">Ver preguntas frecuentes</button>
            </div>
            
            {/* Herramientas */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">Herramientas de Diagnóstico</h3>
              <p className="text-sm text-gray-600 mb-3">Utilidades para resolver problemas</p>
              <button className="text-blue-600 text-sm font-medium">Acceder a herramientas</button>
            </div>
            
            {/* Actualizaciones */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">Registro de Cambios</h3>
              <p className="text-sm text-gray-600 mb-3">Historial de actualizaciones del sistema</p>
              <button className="text-blue-600 text-sm font-medium">Ver cambios</button>
            </div>
            
            {/* Contacto */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">Contacto de Emergencia</h3>
              <p className="text-sm text-gray-600 mb-3">Soporte técnico 24/7 para problemas críticos</p>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Contactar soporte urgente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoporteTecnico;