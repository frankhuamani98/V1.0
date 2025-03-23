import React, { useState, useEffect } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Bike, DollarSign, ImagePlus, Tag, Truck, Star, Download } from "lucide-react";
import * as XLSX from "xlsx"; // Importar la librería xlsx

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
  igv: string;
  calificacion: number;
  stock: number;
  fotoUrl: string;
  disponible: boolean;
  destacado: boolean;
  masVendido: boolean;
  fotosAdicionales: string[];
  compatibilidad: {
    marca: string;
    modelo: string;
    año: string;
  }[];
}

const categoriasYSubcategorias: { [key: string]: string[] } = {
  repuestos: ["Frenos", "Suspensión", "Motor"],
  accesorios: ["Luces", "Espejos", "Alforjas"],
  mantenimiento: ["Aceites", "Filtros", "Líquidos"],
  equipamiento: ["Cascos", "Chaquetas", "Guantes"]
};

const marcasMotos = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "Ducati"];
const modelosMotos: { [key: string]: string[] } = {
  Honda: ["CBR600RR", "CRF250L", "Gold Wing"],
  Yamaha: ["YZF-R1", "MT-07", "Tenere 700"],
  Suzuki: ["GSX-R1000", "V-Strom 650", "Hayabusa"],
  Kawasaki: ["Ninja 400", "Z900", "Versys 650"],
  Ducati: ["Panigale V4", "Multistrada", "Monster"]
};
const añosMotos = ["2020", "2021", "2022", "2023"];

const AgregarProducto = () => {
  const [formData, setFormData] = useState<FormData>({
    codigo: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
    detalles: "",
    descripcionCorta: "",
    precio: "",
    descuento: "",
    precioTotal: "",
    igv: "18", // IGV por defecto en Perú
    calificacion: 0,
    stock: 0,
    fotoUrl: "",
    disponible: true,
    destacado: false,
    masVendido: false,
    fotosAdicionales: [],
    compatibilidad: []
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [subcategorias, setSubcategorias] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [newCompatibilidad, setNewCompatibilidad] = useState({
    marca: "",
    modelo: "",
    año: ""
  });

  useEffect(() => {
    if (formData.categoria) {
      setSubcategorias(categoriasYSubcategorias[formData.categoria] || []);
      setFormData((prev) => ({ ...prev, subcategoria: "" }));
    }
  }, [formData.categoria]);

  useEffect(() => {
    const urls = [formData.fotoUrl, ...formData.fotosAdicionales].filter(Boolean);
    setPreviewUrls(urls);
  }, [formData.fotoUrl, formData.fotosAdicionales]);

  useEffect(() => {
    const precio = parseFloat(formData.precio) || 0;
    const descuento = parseFloat(formData.descuento) || 0;
    const igv = parseFloat(formData.igv) || 0;
    const precioConDescuento = precio - (precio * descuento) / 100;
    const precioTotal = precioConDescuento * (1 + igv / 100);
    setFormData((prev) => ({
      ...prev,
      precioTotal: precioTotal.toFixed(2)
    }));
  }, [formData.precio, formData.descuento, formData.igv]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.codigo) newErrors.codigo = "El código es obligatorio";
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.categoria) newErrors.categoria = "La categoría es obligatoria";
    if (!formData.precio) newErrors.precio = "El precio es obligatorio";
    if (!formData.fotoUrl) newErrors.fotoUrl = "La imagen principal es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      fotosAdicionales: urls.filter(Boolean),
    });
  };

  const handleCompatibilidadChange = (field: keyof typeof newCompatibilidad, value: string) => {
    setNewCompatibilidad(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addCompatibilidad = () => {
    if (newCompatibilidad.marca && newCompatibilidad.modelo && newCompatibilidad.año) {
      setFormData(prev => ({
        ...prev,
        compatibilidad: [...prev.compatibilidad, { ...newCompatibilidad }]
      }));
      setNewCompatibilidad({ marca: "", modelo: "", año: "" });
    }
  };

  const removeCompatibilidad = (index: number) => {
    setFormData(prev => ({
      ...prev,
      compatibilidad: prev.compatibilidad.filter((_, i) => i !== index)
    }));
  };

  const handleCalificacionChange = (calificacion: number) => {
    setFormData({
      ...formData,
      calificacion,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Formulario enviado:", formData);
    } else {
      console.log("Errores en el formulario:", errors);
    }
  };

  // Función para exportar la lista de productos a Excel
  const exportToExcel = () => {
    // Crear una hoja de trabajo con los datos del formulario
    const worksheet = XLSX.utils.json_to_sheet([formData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(workbook, "productos.xlsx");
  };

  return (
    <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Agregar Nuevo Producto</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription>Detalles principales del producto</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código del Producto</Label>
                <Input
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ingrese el código del producto"
                />
                {errors.codigo && <span className="text-red-500 text-sm">{errors.codigo}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Producto</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre del producto"
                />
                {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categoriasYSubcategorias).map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategoria">Subcategoría</Label>
                <Select
                  value={formData.subcategoria}
                  onValueChange={(value) => setFormData({ ...formData, subcategoria: value })}
                  disabled={!formData.categoria}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategorias.map((subcategoria) => (
                      <SelectItem key={subcategoria} value={subcategoria}>
                        {subcategoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subcategoria && <span className="text-red-500 text-sm">{errors.subcategoria}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcionCorta">Descripción Corta</Label>
                <Textarea
                  id="descripcionCorta"
                  name="descripcionCorta"
                  value={formData.descripcionCorta}
                  onChange={handleChange}
                  placeholder="Ingrese una descripción corta del producto"
                />
                {errors.descripcionCorta && <span className="text-red-500 text-sm">{errors.descripcionCorta}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="detalles">Detalles del Producto</Label>
                <Textarea
                  id="detalles"
                  name="detalles"
                  value={formData.detalles}
                  onChange={handleChange}
                  placeholder="Ingrese los detalles del producto"
                />
                {errors.detalles && <span className="text-red-500 text-sm">{errors.detalles}</span>}
              </div>
            </CardContent>
          </Card>

          {/* Compatibilidad con Motos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bike className="h-5 w-5" />
                Compatibilidad con Motos
              </CardTitle>
              <CardDescription>Agregue las motos compatibles con este producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca</Label>
                  <Select
                    value={newCompatibilidad.marca}
                    onValueChange={(value) => handleCompatibilidadChange("marca", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {marcasMotos.map((marca) => (
                        <SelectItem key={marca} value={marca}>
                          {marca}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Select
                    value={newCompatibilidad.modelo}
                    onValueChange={(value) => handleCompatibilidadChange("modelo", value)}
                    disabled={!newCompatibilidad.marca}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      {newCompatibilidad.marca &&
                        modelosMotos[newCompatibilidad.marca]?.map((modelo) => (
                          <SelectItem key={modelo} value={modelo}>
                            {modelo}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="año">Año</Label>
                  <Select
                    value={newCompatibilidad.año}
                    onValueChange={(value) => handleCompatibilidadChange("año", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un año" />
                    </SelectTrigger>
                    <SelectContent>
                      {añosMotos.map((año) => (
                        <SelectItem key={año} value={año}>
                          {año}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="button" onClick={addCompatibilidad}>
                Agregar Compatibilidad
              </Button>
              <div className="space-y-4">
                {formData.compatibilidad.map((compatibilidad, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span>{`${compatibilidad.marca} ${compatibilidad.modelo} (${compatibilidad.año})`}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCompatibilidad(index)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Precio y Stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Precio y Stock
              </CardTitle>
              <CardDescription>Información de precio y disponibilidad</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="precio">Precio (S/.)</Label>
                <Input
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Ingrese el precio"
                />
                {errors.precio && <span className="text-red-500 text-sm">{errors.precio}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="descuento">Descuento (%)</Label>
                <Input
                  id="descuento"
                  name="descuento"
                  value={formData.descuento}
                  onChange={handleChange}
                  placeholder="Ingrese el descuento"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="igv">IGV (%)</Label>
                <Input
                  id="igv"
                  name="igv"
                  value={formData.igv}
                  onChange={handleChange}
                  placeholder="Ingrese el IGV"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="precioTotal">Precio Total (S/.)</Label>
                <Input
                  id="precioTotal"
                  name="precioTotal"
                  value={formData.precioTotal}
                  readOnly
                  placeholder="Precio total"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Ingrese el stock"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disponible">Disponible</Label>
                <Switch
                  id="disponible"
                  checked={formData.disponible}
                  onCheckedChange={(checked) => handleSwitchChange("disponible", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destacado">Destacado</Label>
                <Switch
                  id="destacado"
                  checked={formData.destacado}
                  onCheckedChange={(checked) => handleSwitchChange("destacado", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="masVendido">Más Vendido</Label>
                <Switch
                  id="masVendido"
                  checked={formData.masVendido}
                  onCheckedChange={(checked) => handleSwitchChange("masVendido", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Calificación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Calificación del Producto
              </CardTitle>
              <CardDescription>Asigne una calificación al producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant={formData.calificacion >= star ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleCalificacionChange(star)}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Imágenes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5" />
                Imágenes del Producto
              </CardTitle>
              <CardDescription>Agregue imágenes del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fotoUrl">Imagen Principal</Label>
                <Input
                  id="fotoUrl"
                  name="fotoUrl"
                  value={formData.fotoUrl}
                  onChange={handleChange}
                  placeholder="Ingrese la URL de la imagen principal"
                />
                {errors.fotoUrl && <span className="text-red-500 text-sm">{errors.fotoUrl}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fotosAdicionales">Imágenes Adicionales</Label>
                <Input
                  id="fotosAdicionales"
                  name="fotosAdicionales"
                  value={formData.fotosAdicionales.join(", ")}
                  onChange={handleFotosAdicionalesChange}
                  placeholder="Ingrese las URLs de las imágenes adicionales, separadas por comas"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary">
              <Truck className="mr-2 h-4 w-4" />
              Guardar Producto
            </Button>
            <Button type="button" onClick={exportToExcel} className="bg-green-500">
              <Download className="mr-2 h-4 w-4" />
              Exportar a Excel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;