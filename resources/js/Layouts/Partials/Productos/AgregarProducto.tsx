import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { QRCodeSVG } from "qrcode.react"; 

const AgregarProducto = () => {
  const [formData, setFormData] = useState({
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
    motosRelacionadas: "",
    fotoUrl: "",
    disponible: true,
    destacado: false,
    masVendido: false,
    stock: 0,
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Agregar Producto</h1>
      <p className="text-muted-foreground">
        Aquí puedes agregar nuevos productos al inventario.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="codigo">Código del Producto</Label>
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
          </div>
          <div>
            <Label htmlFor="nombre">Nombre del Producto</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
              required
            />
          </div>
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
            />
          </div>
          <div>
            <Label htmlFor="categoria">Categoría</Label>
            <Select
              name="categoria"
              value={formData.categoria}
              onValueChange={(value) =>
                setFormData({ ...formData, categoria: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="repuestos">Repuestos</SelectItem>
                <SelectItem value="accesorios">Accesorios</SelectItem>
                <SelectItem value="lubricantes">Lubricantes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subcategoria">Subcategoría</Label>
            <Select
              name="subcategoria"
              value={formData.subcategoria}
              onValueChange={(value) =>
                setFormData({ ...formData, subcategoria: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una subcategoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motor">Motor</SelectItem>
                <SelectItem value="frenos">Frenos</SelectItem>
                <SelectItem value="suspension">Suspensión</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="detalles">Detalles</Label>
            <Textarea
              id="detalles"
              name="detalles"
              value={formData.detalles}
              onChange={handleChange}
              placeholder="Ingrese los detalles del producto"
            />
          </div>
          <div>
            <Label htmlFor="descripcionCorta">Descripción Corta</Label>
            <Textarea
              id="descripcionCorta"
              name="descripcionCorta"
              value={formData.descripcionCorta}
              onChange={handleChange}
              placeholder="Ingrese una descripción corta del producto"
            />
          </div>
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
            />
          </div>
          <div>
            <Label htmlFor="descuento">Descuento</Label>
            <Input
              id="descuento"
              name="descuento"
              type="number"
              value={formData.descuento}
              onChange={handleChange}
              placeholder="Ingrese el descuento"
            />
          </div>
          <div>
            <Label htmlFor="precioTotal">Precio Total</Label>
            <Input
              id="precioTotal"
              name="precioTotal"
              type="number"
              value={formData.precioTotal}
              onChange={handleChange}
              placeholder="Ingrese el precio total"
              required
            />
          </div>
          <div>
            <Label htmlFor="motosRelacionadas">Motos Relacionadas</Label>
            <Input
              id="motosRelacionadas"
              name="motosRelacionadas"
              value={formData.motosRelacionadas}
              onChange={handleChange}
              placeholder="Ingrese las motos relacionadas"
            />
          </div>
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
            />
          </div>
          <div>
            <Label htmlFor="disponible">Disponible</Label>
            <Switch
              id="disponible"
              checked={formData.disponible}
              onCheckedChange={(checked) =>
                handleSwitchChange("disponible", checked)
              }
            />
          </div>
          <div>
            <Label htmlFor="destacado">Destacado</Label>
            <Switch
              id="destacado"
              checked={formData.destacado}
              onCheckedChange={(checked) =>
                handleSwitchChange("destacado", checked)
              }
            />
          </div>
          <div>
            <Label htmlFor="masVendido">Lo más vendido</Label>
            <Switch
              id="masVendido"
              checked={formData.masVendido}
              onCheckedChange={(checked) =>
                handleSwitchChange("masVendido", checked)
              }
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Agregar Producto</Button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;