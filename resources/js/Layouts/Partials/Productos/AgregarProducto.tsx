import React, { useState, useEffect } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Tag } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface FormData {
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  detalles: string;
  descripcionCorta: string;
}

const categoriasYSubcategorias: { [key: string]: string[] } = {
  repuestos: ["Frenos", "Suspensión", "Motor"],
  accesorios: ["Luces", "Espejos", "Alforjas"],
  mantenimiento: ["Aceites", "Filtros", "Líquidos"],
  equipamiento: ["Cascos", "Chaquetas", "Guantes"]
};

const AgregarProducto = () => {
  const [formData, setFormData] = useState<FormData>({
    codigo: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
    detalles: "",
    descripcionCorta: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [subcategorias, setSubcategorias] = useState<string[]>([]);

  useEffect(() => {
    if (formData.categoria) {
      setSubcategorias(categoriasYSubcategorias[formData.categoria] || []);
      setFormData((prev) => ({ ...prev, subcategoria: "" }));
    }
  }, [formData.categoria]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.codigo) newErrors.codigo = "El código es obligatorio";
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.categoria) newErrors.categoria = "La categoría es obligatoria";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Formulario enviado:", formData);
    } else {
      console.log("Errores en el formulario:", errors);
    }
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

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary">
              Guardar Producto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;