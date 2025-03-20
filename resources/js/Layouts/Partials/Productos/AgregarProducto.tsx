import React, { useState, useEffect } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { QRCodeSVG } from "qrcode.react"; // Usa QRCodeSVG en lugar de QRCode

interface FormData {
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  detalles: string;
  descripcionCorta: string;
  precio: string;
  descuento: string;
  precioTotal: string;
  productosRelacionados: string;
  fotoUrl: string;
  disponible: boolean;
  destacado: boolean;
  masVendido: boolean;
  stock: number;
  color: string;
  fotosAdicionales: string[]; // Array de URLs
}

// Datos de ejemplo para categorías y subcategorías
const categoriasYSubcategorias: { [key: string]: string[] } = {
  repuestos: ["Motor", "Frenos", "Suspensión"],
  accesorios: ["Cascos", "Guantes", "Chaquetas"],
  lubricantes: ["Aceites", "Grasas", "Aditivos"],
};

const AgregarProducto = () => {
  const [formData, setFormData] = useState<FormData>({
    codigo: "",
    nombre: "",
    qr: "",
    categoria: "",
    subcategoria: "",
    detalles: "",
    descripcionCorta: "",
    precio: "",
    descuento: "",
    precioTotal: "",
    productosRelacionados: "",
    fotoUrl: "",
    disponible: true,
    destacado: false,
    masVendido: false,
    stock: 0,
    color: "",
    fotosAdicionales: [], // Array de URLs
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchResults, setSearchResults] = useState<{ id: number; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategorias, setSubcategorias] = useState<string[]>([]);

  // Actualizar subcategorías cuando cambia la categoría
  useEffect(() => {
    if (formData.categoria) {
      setSubcategorias(categoriasYSubcategorias[formData.categoria] || []);
      setFormData((prev) => ({ ...prev, subcategoria: "" })); // Resetear subcategoría
    }
  }, [formData.categoria]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.codigo) newErrors.codigo = "El código es obligatorio.";
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    const precio = parseFloat(formData.precio);
    const descuento = parseFloat(formData.descuento);
    const stock = parseInt(formData.stock.toString());

    if (!formData.precio || isNaN(precio) || precio <= 0)
      newErrors.precio = "El precio debe ser un número positivo.";
    if (formData.descuento && (isNaN(descuento) || descuento < 0 || descuento > 100))
      newErrors.descuento = "El descuento debe ser un número entre 0 y 100.";
    if (!formData.stock || isNaN(stock) || stock < 0)
      newErrors.stock = "El stock debe ser un número positivo.";
    if (formData.fotosAdicionales.length > 4)
      newErrors.fotosAdicionales = "No se pueden agregar más de 4 fotos.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const precio = parseFloat(formData.precio);
    const descuento = parseFloat(formData.descuento);

    if (!isNaN(precio)) {
      const total = isNaN(descuento) ? precio : precio - (precio * descuento / 100);
      setFormData((prev) => ({
        ...prev,
        precioTotal: total.toFixed(2),
      }));
    }
  }, [formData.precio, formData.descuento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Si el campo es "codigo", generamos el QR y el nombre automáticamente
    if (name === "codigo") {
      const nombreGenerado = `Producto ${value}`; // Generamos un nombre basado en el código
      setFormData((prev) => ({
        ...prev,
        qr: value, // El QR será igual al código ingresado
        nombre: nombreGenerado, // Autocompletamos el nombre
      }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFotosAdicionalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setFormData({
      ...formData,
      fotosAdicionales: urls,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Formulario enviado:", formData);
      // Aquí puedes enviar los datos al backend
    } else {
      console.log("Errores en el formulario:", errors);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Simulación de búsqueda de productos relacionados
    const results: { id: number; name: string }[] = [
      { id: 1, name: "Moto A" },
      { id: 2, name: "Moto B" },
      { id: 3, name: "Modelo C" },
    ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(results);
  };

  const handleSelectResult = (result: { id: number; name: string }) => {
    setSearchQuery(result.name);
    setFormData({
      ...formData,
      productosRelacionados: result.name,
    });
    setSearchResults([]);
  };

  const generarCodigo = () => {
    const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
    const nombreGenerado = `Producto ${codigo}`; // Generamos un nombre basado en el código
    setFormData({
      ...formData,
      codigo: codigo,
      qr: codigo, // Asignamos el mismo código al QR
      nombre: nombreGenerado, // Autocompletamos el nombre
    });
  };

  // Función para simular el escaneo de un QR
  const simularEscaneoQR = () => {
    const qrEscaneado = "PROD-12345|Producto Ejemplo"; // Simulamos un QR escaneado
    const [codigo, nombre] = qrEscaneado.split("|"); // Separamos el código y el nombre

    setFormData({
      ...formData,
      codigo: codigo,
      nombre: nombre,
      qr: codigo, // Generamos el QR con el código escaneado
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Agregar Producto</h1>
      <p className="text-muted-foreground text-gray-600">
        Aquí puedes agregar nuevos productos al inventario.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Código del Producto */}
          <div>
            <Label htmlFor="codigo">Código del Producto</Label>
<<<<<<< HEAD
            <div className="flex space-x-2">
              <Input
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                placeholder="Ingrese el código o genere uno"
                required
              />
              <Button type="button" onClick={generarCodigo}>
                Generar Código
              </Button>
            </div>
=======
            <Input
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              placeholder="Ingrese el código del producto"
              required
              className="mt-1"
            />
            {errors.codigo && <p className="text-red-500 text-sm mt-1">{errors.codigo}</p>}
>>>>>>> 8be72d3a4089af4f80b3bb90329a412f8dc27537
          </div>

          {/* Nombre del Producto */}
          <div>
            <Label htmlFor="nombre">Nombre del Producto</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
              required
              className="mt-1"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>

          {/* URL de la Foto */}
          <div>
            <Label htmlFor="qr">Código QR</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="qr"
                name="qr"
                value={formData.qr}
                onChange={handleChange}
                placeholder="Código QR generado automáticamente"
                readOnly
              />
              {formData.qr && (
                <div className="p-2 border rounded">
                  <QRCodeSVG value={formData.qr} size={64} /> {/* Mostrar el QR */}
                </div>
              )}
            </div>
          </div>
          <div>
            <Button type="button" onClick={simularEscaneoQR}>
              Simular Escaneo de QR
            </Button>
          </div>
          {/* Resto del formulario */}
          <div>
            <Label htmlFor="fotoUrl">URL de la Foto</Label>
            <Input
              id="fotoUrl"
              name="fotoUrl"
              value={formData.fotoUrl}
              onChange={handleChange}
              placeholder="Ingrese la URL de la foto del producto"
              className="mt-1"
            />
          </div>

          {/* Color */}
          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ingrese el color del producto"
              className="mt-1"
            />
          </div>

          {/* Fotos Adicionales */}
          <div>
            <Label htmlFor="fotosAdicionales">Fotos Adicionales (Máx. 4 URLs)</Label>
            <Input
              id="fotosAdicionales"
              name="fotosAdicionales"
              value={formData.fotosAdicionales.join(", ")}
              onChange={handleFotosAdicionalesChange}
              placeholder="Ingrese las URLs de las fotos adicionales, separadas por comas"
              className="mt-1"
            />
            {errors.fotosAdicionales && (
              <p className="text-red-500 text-sm mt-1">{errors.fotosAdicionales}</p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <Label htmlFor="categoria">Categoría</Label>
            <Select
              name="categoria"
              value={formData.categoria}
              onValueChange={(value) =>
                setFormData({ ...formData, categoria: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="repuestos">Repuestos</SelectItem>
                <SelectItem value="accesorios">Accesorios</SelectItem>
                <SelectItem value="lubricantes">Lubricantes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subcategoría */}
          <div>
            <Label htmlFor="subcategoria">Subcategoría</Label>
            <Select
              name="subcategoria"
              value={formData.subcategoria}
              onValueChange={(value) =>
                setFormData({ ...formData, subcategoria: value })
              }
              disabled={!formData.categoria}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccione una subcategoría" />
              </SelectTrigger>
              <SelectContent>
                {subcategorias.map((subcat) => (
                  <SelectItem key={subcat} value={subcat}>
                    {subcat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Detalles */}
          <div>
            <Label htmlFor="detalles">Detalles</Label>
            <Textarea
              id="detalles"
              name="detalles"
              value={formData.detalles}
              onChange={handleChange}
              placeholder="Ingrese los detalles del producto"
              className="mt-1"
            />
          </div>

          {/* Descripción Corta */}
          <div>
            <Label htmlFor="descripcionCorta">Descripción Corta</Label>
            <Textarea
              id="descripcionCorta"
              name="descripcionCorta"
              value={formData.descripcionCorta}
              onChange={handleChange}
              placeholder="Ingrese una descripción corta del producto"
              className="mt-1"
            />
          </div>

          {/* Precio */}
          <div>
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ingrese el precio del producto"
              required
              className="mt-1"
            />
            {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
          </div>

          {/* Descuento */}
          <div>
            <Label htmlFor="descuento">Descuento (%)</Label>
            <Input
              id="descuento"
              name="descuento"
              type="number"
              value={formData.descuento}
              onChange={handleChange}
              placeholder="Ingrese el descuento"
              className="mt-1"
            />
            {errors.descuento && <p className="text-red-500 text-sm mt-1">{errors.descuento}</p>}
          </div>

          {/* Precio Total */}
          <div>
            <Label htmlFor="precioTotal">Precio Total</Label>
            <Input
              id="precioTotal"
              name="precioTotal"
              type="number"
              value={formData.precioTotal}
              onChange={handleChange}
              placeholder="Precio total calculado"
              readOnly
              className="mt-1"
            />
          </div>

          {/* Productos Relacionados */}
          <div>
            <Label htmlFor="productosRelacionados">Productos Relacionados</Label>
            <Input
              id="productosRelacionados"
              name="productosRelacionados"
              value={formData.productosRelacionados}
              onChange={handleChange}
              placeholder="Ingrese los productos relacionados"
              className="mt-1"
            />
            <Input
              type="text"
              placeholder="Buscar moto o modelo..."
              value={searchQuery}
              onChange={handleSearch}
              className="mt-2"
            />
            {searchResults.length > 0 && (
              <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md">
                {searchResults.map((result) => (
                  <li
                    key={result.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectResult(result)}
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Stock del Producto */}
          <div>
            <Label htmlFor="stock">Stock del Producto</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ingrese el stock disponible"
              required
              className="mt-1"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          {/* Disponible */}
          <div>
            <Label htmlFor="disponible">Disponible</Label>
            <Switch
              id="disponible"
              checked={formData.disponible}
              onCheckedChange={(checked) =>
                handleSwitchChange("disponible", checked)
              }
              className="mt-1"
            />
          </div>

          {/* Destacado */}
          <div>
            <Label htmlFor="destacado">Destacado</Label>
            <Switch
              id="destacado"
              checked={formData.destacado}
              onCheckedChange={(checked) =>
                handleSwitchChange("destacado", checked)
              }
              className="mt-1"
            />
          </div>

          {/* Lo más vendido */}
          <div>
            <Label htmlFor="masVendido">Lo más vendido</Label>
            <Switch
              id="masVendido"
              checked={formData.masVendido}
              onCheckedChange={(checked) =>
                handleSwitchChange("masVendido", checked)
              }
              className="mt-1"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Agregar Producto
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;