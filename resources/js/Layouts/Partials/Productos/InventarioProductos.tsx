import React from "react";

const InventarioProductos = () => {
  // Datos de ejemplo para el inventario de productos
  const productos = [
    {
      codigo: "P001",
      nombre: "Producto 1",
      urlFoto: "#",
      categoria: "Repuestos",
      subcategoria: "Subcategoría 1",
      detalles: "Detalles del producto 1",
      descripcionCorta: "Descripción corta 1",
      precio: "$10.00",
      descuento: "10%",
      precioTotal: "$9.00",
      motosRelacionadas: "Moto 1",
      stock: 50,
    },
    // Agrega más productos según sea necesario
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Código</th>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Categoría</th>
              <th className="py-2 px-4">Precio</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{producto.codigo}</td>
                <td className="py-3 px-4">{producto.nombre}</td>
                <td className="py-3 px-4">{producto.categoria}</td>
                <td className="py-3 px-4">{producto.precio}</td>
                <td className="py-3 px-4">{producto.stock}</td>
                <td className="py-3 px-4 flex items-center space-x-2">
                  <a href={producto.urlFoto} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-eye text-blue-500 hover:text-blue-700"></i>
                  </a>

                  
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventarioProductos;
