import React from "react";

const ListaTecnicos = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Lista de Técnicos</h1>
      <p className="text-muted-foreground">
        Aquí puedes ver y administrar los técnicos registrados en el taller.
      </p>
      {/* Agrega una tabla con los nombres, especialidades y estado de cada técnico */}
    </div>
  );
};

export default ListaTecnicos;
