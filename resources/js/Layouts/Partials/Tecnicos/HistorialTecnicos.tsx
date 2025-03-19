import React from "react";

const HistorialTecnicos = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Historial de Reparaciones por Técnico</h1>
      <p className="text-muted-foreground">
        Aquí puedes ver las reparaciones realizadas por cada técnico.
      </p>
      {/* Puedes agregar una tabla con el historial filtrado por técnico */}
    </div>
  );
};

export default HistorialTecnicos;
