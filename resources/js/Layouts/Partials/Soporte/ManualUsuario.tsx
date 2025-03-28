import React from "react";

const ManualUsuario = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Centro de Ayuda - Manual del Administrador</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Guías por Módulo</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cómo gestionar pedidos eficientemente</li>
          <li>Administración de categorías de productos</li>
          <li>Gestión de usuarios y permisos</li>
          <li>Configuración inicial del sistema</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Procedimientos Comunes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Agregar nuevos usuarios administrativos</li>
          <li>Actualizar inventario de motos</li>
          <li>Generación de reportes de facturación</li>
          <li>Configuración de banners promocionales</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Solución de Problemas</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Recuperación de contraseñas</li>
          <li>Problemas de acceso a módulos</li>
          <li>Errores comunes y soluciones</li>
          <li>Actualizaciones del sistema</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Soporte Técnico</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Contacto directo</h3>
            <p className="text-sm text-muted-foreground">soporte@rudolfmotos.com - Tel: 555-1234</p>
          </div>
          <div>
            <h3 className="font-medium">Horario de atención</h3>
            <p className="text-sm text-muted-foreground">Lunes a Viernes: 8:00 am - 6:00 pm</p>
          </div>
          <div>
            <h3 className="font-medium">Solicitud de soporte urgente</h3>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
              Abrir ticket de emergencia
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Recursos Adicionales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="p-4 border rounded hover:bg-gray-50">
            <h3 className="font-medium">Video-tutoriales</h3>
            <p className="text-sm text-muted-foreground">Aprende con nuestros videos instructivos</p>
          </a>
          <a href="#" className="p-4 border rounded hover:bg-gray-50">
            <h3 className="font-medium">Base de conocimiento</h3>
            <p className="text-sm text-muted-foreground">Preguntas frecuentes y soluciones</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManualUsuario;