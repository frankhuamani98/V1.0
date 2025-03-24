import React, { useState, useEffect, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { X, Star, Check, Plus, Minus, Palette } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Switch } from "@/Components/ui/switch";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useForm, router } from '@inertiajs/react';
import { toast } from 'sonner';

interface Categoria {
    id: number;
    nombre: string;
    subcategorias: Subcategoria[];
}

interface Subcategoria {
    id: number;
    nombre: string;
}

interface Moto {
    id: number;
    año: number;
    modelo: string;
    marca: string;
    estado: string;
}

interface ColorOption {
    id: string;
    nombre: string;
    hex: string;
}

interface AgregarProductoProps {
    categorias: Categoria[];
    motos: Moto[];
}

const coloresPrimarios: ColorOption[] = [
    { id: 'rojo', nombre: 'Rojo', hex: '#FF0000' },
    { id: 'verde', nombre: 'Verde', hex: '#00FF00' },
    { id: 'azul', nombre: 'Azul', hex: '#0000FF' },
    { id: 'amarillo', nombre: 'Amarillo', hex: '#FFFF00' },
    { id: 'cian', nombre: 'Cian', hex: '#00FFFF' },
    { id: 'magenta', nombre: 'Magenta', hex: '#FF00FF' },
    { id: 'naranja', nombre: 'Naranja', hex: '#FFA500' },
    { id: 'verde-lima', nombre: 'Verde Lima', hex: '#00FF00' },
    { id: 'azul-cielo', nombre: 'Azul Cielo', hex: '#87CEEB' },
    { id: 'rosa-fuerte', nombre: 'Rosa Fuerte', hex: '#FF007F' },
    { id: 'morado', nombre: 'Morado', hex: '#800080' },
    { id: 'turquesa', nombre: 'Turquesa', hex: '#40E0D0' }
];

const AgregarProducto: React.FC<AgregarProductoProps> = ({ categorias, motos }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        codigo: "",
        nombre: "",
        descripcion_corta: "",
        detalles: "",
        categoria_id: "",
        subcategoria_id: "",
        moto_id: "",
        precio: "",
        descuento: "0",
        imagen_principal: "",
        imagenes_adicionales: [] as string[],
        calificacion: 0,
        incluye_igv: false,
        stock: 0,
        colores: [] as string[],
        coloresPersonalizados: [] as {hex: string}[],
        destacado: false,
        mas_vendido: false,
    });

    const [nuevaImagen, setNuevaImagen] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
    const [showStockInput, setShowStockInput] = useState(false);
    const [tempStock, setTempStock] = useState("0");
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [customColor, setCustomColor] = useState("#3b82f6");

    // Calcular precios
    const { precioSinIGV, precioConIGV, precioTotal } = useMemo(() => {
        const precioBase = parseFloat(data.precio) || 0;
        const descuento = parseFloat(data.descuento) || 0;
        const IGV_PERCENT = 18;

        let precioConDescuento = precioBase;
        if (descuento > 0 && descuento < 100) {
            precioConDescuento = precioBase - (precioBase * descuento / 100);
        } else if (descuento >= 100) {
            precioConDescuento = 0;
        }

        let precioFinal = precioConDescuento;
        if (data.incluye_igv) {
            const precioSinIGV = precioConDescuento / (1 + IGV_PERCENT / 100);
            return {
                precioSinIGV: precioSinIGV,
                precioConIGV: precioConDescuento,
                precioTotal: precioConDescuento
            };
        } else {
            const igv = precioConDescuento * (IGV_PERCENT / 100);
            return {
                precioSinIGV: precioConDescuento,
                precioConIGV: precioConDescuento + igv,
                precioTotal: precioConDescuento + igv
            };
        }
    }, [data.precio, data.descuento, data.incluye_igv]);

    useEffect(() => {
        if (data.categoria_id) {
            const categoriaSeleccionada = categorias.find(
                cat => cat.id.toString() === data.categoria_id
            );
            setSubcategorias(categoriaSeleccionada?.subcategorias || []);
            setData('subcategoria_id', "");
        }
    }, [data.categoria_id, categorias]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        setData(name as keyof typeof data, type === 'checkbox' ? (checked ?? false) as false : value as string | number);
    };

    const agregarImagenAdicional = () => {
        if (nuevaImagen && data.imagenes_adicionales.length < 4) {
            setData('imagenes_adicionales', [...data.imagenes_adicionales, nuevaImagen]);
            setNuevaImagen("");
        }
    };

    const eliminarImagenAdicional = (index: number) => {
        setData('imagenes_adicionales', data.imagenes_adicionales.filter((_, i) => i !== index));
    };

    const handleRatingClick = (rating: number) => {
        setData('calificacion', rating);
    };

    const toggleColor = (colorId: string) => {
        if (data.colores.includes(colorId)) {
            setData('colores', data.colores.filter(c => c !== colorId));
        } else {
            setData('colores', [...data.colores, colorId]);
        }
    };

    const agregarColorPersonalizado = () => {
        if (customColor) {
            setData('coloresPersonalizados', [...data.coloresPersonalizados, { hex: customColor }]);
            setCustomColor("#3b82f6");
            setShowColorPicker(false);
        }
    };

    const eliminarColorPersonalizado = (index: number) => {
        setData('coloresPersonalizados', data.coloresPersonalizados.filter((_, i) => i !== index));
    };

    const handleStockChange = () => {
        const stockValue = parseInt(tempStock) || 0;
        setData('stock', stockValue);
        setShowStockInput(false);
    };

    const incrementStock = () => {
        setData('stock', data.stock + 1);
    };

    const decrementStock = () => {
        setData('stock', Math.max(0, data.stock - 1));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.post(route('productos.store'), {
            ...data,
            imagenes_adicionales: data.imagenes_adicionales,
            colores: data.colores,
            coloresPersonalizados: data.coloresPersonalizados,
        }, {
            onSuccess: () => {
                toast.success('Producto creado exitosamente');
                reset();
            },
            onError: (errors) => {
                toast.error('Error al crear el producto');
                console.error(errors);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-4">
                    {/* Código y Nombre */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="codigo">Código del Producto</Label>
                            <Input
                                id="codigo"
                                name="codigo"
                                value={data.codigo}
                                onChange={handleInputChange}
                                placeholder="Ej: PROD-001"
                                required
                            />
                            {errors.codigo && <p className="text-red-500 text-sm">{errors.codigo}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre del Producto</Label>
                            <Input
                                id="nombre"
                                name="nombre"
                                value={data.nombre}
                                onChange={handleInputChange}
                                placeholder="Ej: Filtro de Aire XYZ"
                                required
                            />
                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                        </div>
                    </div>

                    {/* Descripción corta */}
                    <div className="space-y-2">
                        <Label htmlFor="descripcion_corta">Descripción Corta</Label>
                        <Textarea
                            id="descripcion_corta"
                            name="descripcion_corta"
                            value={data.descripcion_corta}
                            onChange={handleInputChange}
                            placeholder="Breve descripción del producto (máx. 150 caracteres)"
                            rows={3}
                            required
                        />
                        {errors.descripcion_corta && <p className="text-red-500 text-sm">{errors.descripcion_corta}</p>}
                    </div>

                    {/* Imagen principal */}
                    <div className="space-y-2">
                        <Label htmlFor="imagen_principal">Imagen Principal (URL)</Label>
                        <Input
                            id="imagen_principal"
                            name="imagen_principal"
                            value={data.imagen_principal}
                            onChange={handleInputChange}
                            placeholder="https://ejemplo.com/imagen-producto.jpg"
                            type="url"
                            required
                        />
                        {data.imagen_principal && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
                                <img 
                                    src={data.imagen_principal} 
                                    alt="Vista previa imagen principal"
                                    className="h-40 w-full object-contain border rounded-md"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        {errors.imagen_principal && <p className="text-red-500 text-sm">{errors.imagen_principal}</p>}
                    </div>

                    {/* Colores Primarios */}
                    <div className="space-y-2">
                        <Label>Colores Disponibles</Label>
                        <div className="flex flex-wrap gap-2">
                            {coloresPrimarios.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => toggleColor(color.id)}
                                    className={`relative h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all
                                        ${data.colores.includes(color.id) ? 'border-blue-500 scale-110' : 'border-gray-200'}`}
                                    style={{ backgroundColor: color.hex }}
                                    title={`${color.nombre} (${color.hex})`}
                                >
                                    {data.colores.includes(color.id) && (
                                        <Check className="h-5 w-5 text-white" />
                                    )}
                                </button>
                            ))}
                        </div>
                        {data.colores.length > 0 && (
                            <p className="text-sm text-gray-500">
                                Seleccionados: {data.colores.map(id => 
                                    coloresPrimarios.find(c => c.id === id)?.nombre).join(', ')}
                            </p>
                        )}
                    </div>

                    {/* Color personalizado simplificado */}
                    <div className="space-y-2 border p-4 rounded-md">
                        <Label>Agregar Color Personalizado</Label>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div 
                                className="h-12 w-12 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
                                style={{ backgroundColor: customColor }}
                                onClick={() => setShowColorPicker(!showColorPicker)}
                            >
                                <Palette className="h-5 w-5 text-white" />
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <HexColorInput 
                                        color={customColor} 
                                        onChange={setCustomColor} 
                                        prefixed
                                        className="border rounded px-2 py-1 flex-1"
                                    />
                                    <Button 
                                        onClick={agregarColorPersonalizado}
                                        className="whitespace-nowrap"
                                        type="button"
                                    >
                                        Agregar
                                    </Button>
                                </div>
                            </div>
                        </div>
                        
                        {showColorPicker && (
                            <div className="mt-4">
                                <HexColorPicker 
                                    color={customColor} 
                                    onChange={setCustomColor} 
                                    style={{ width: '100%' }}
                                />
                            </div>
                        )}
                        
                        {/* Colores personalizados agregados */}
                        {data.coloresPersonalizados.length > 0 && (
                            <div className="mt-4">
                                <Label>Tus colores personalizados</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {data.coloresPersonalizados.map((color, index) => (
                                        <div key={index} className="relative">
                                            <div
                                                className="h-10 w-10 rounded-full border-2 border-gray-200 relative group"
                                                style={{ backgroundColor: color.hex }}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarColorPersonalizado(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-4">
                    {/* Detalles del producto */}
                    <div className="space-y-2">
                        <Label htmlFor="detalles">Detalles del Producto</Label>
                        <Textarea
                            id="detalles"
                            name="detalles"
                            value={data.detalles}
                            onChange={handleInputChange}
                            placeholder="Especificaciones técnicas, materiales, etc."
                            rows={5}
                        />
                        {errors.detalles && <p className="text-red-500 text-sm">{errors.detalles}</p>}
                    </div>

                    {/* Precios */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Precio en Soles */}
                        <div className="space-y-2">
                            <Label htmlFor="precio">Precio (S/.)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">S/.</span>
                                <Input
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    value={data.precio}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="pl-10"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                        </div>

                        {/* Descuento */}
                        <div className="space-y-2">
                            <Label htmlFor="descuento">Descuento (%)</Label>
                            <Input
                                id="descuento"
                                name="descuento"
                                type="number"
                                value={data.descuento}
                                onChange={handleInputChange}
                                placeholder="0"
                                min="0"
                                max="100"
                                required
                            />
                            {errors.descuento && <p className="text-red-500 text-sm">{errors.descuento}</p>}
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <Label>Stock Disponible</Label>
                            {showStockInput ? (
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        value={tempStock}
                                        onChange={(e) => setTempStock(e.target.value)}
                                        min="0"
                                        className="flex-1"
                                    />
                                    <Button size="sm" onClick={handleStockChange} type="button">
                                        <Check className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={decrementStock}
                                        disabled={data.stock <= 0}
                                        type="button"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <div 
                                        className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                                        onClick={() => {
                                            setTempStock(data.stock.toString());
                                            setShowStockInput(true);
                                        }}
                                    >
                                        {data.stock}
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={incrementStock}
                                        type="button"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                        </div>
                    </div>

                    {/* Opciones de producto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <Switch 
                                id="destacado" 
                                checked={data.destacado}
                                onCheckedChange={(checked: boolean) => setData('destacado', checked as false)}
                            />
                            <Label htmlFor="destacado">Producto Destacado</Label>
                            {data.destacado && <Badge variant="secondary" className="ml-auto">Destacado</Badge>}
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <Switch 
                                id="mas_vendido" 
                                checked={data.mas_vendido}
                                onCheckedChange={(checked: boolean) => setData('mas_vendido', checked as false)}
                            />
                            <Label htmlFor="mas_vendido">Más Vendido</Label>
                            {data.mas_vendido && <Badge variant="secondary" className="ml-auto">Popular</Badge>}
                        </div>
                    </div>

                    {/* Incluye IGV */}
                    <div className="space-y-2 flex items-center p-3 border rounded-md">
                        <input
                            id="incluye_igv"
                            name="incluye_igv"
                            type="checkbox"
                            checked={data.incluye_igv}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="incluye_igv" className="ml-2">
                            ¿El precio incluye IGV (18%)?
                        </Label>
                    </div>

                    {/* Detalles de precios */}
                    <div className="space-y-2 border p-4 rounded-md bg-gray-50 dark:bg-gray-800">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Precio sin IGV:</span>
                            <span className="font-medium">S/. {precioSinIGV.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">IGV (18%):</span>
                            <span className="font-medium">S/. {(precioConIGV - precioSinIGV).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                            <span className="text-gray-600 font-semibold">Precio Total:</span>
                            <span className="font-bold">S/. {precioTotal.toFixed(2)}</span>
                        </div>
                        {data.descuento > "0" && (
                            <div className="text-sm text-green-600 mt-1">
                                Descuento del {data.descuento}% aplicado
                            </div>
                        )}
                    </div>

                    {/* Calificación por estrellas */}
                    <div className="space-y-2">
                        <Label>Calificación del Producto</Label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingClick(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`h-6 w-6 ${(hoverRating || data.calificacion) >= star 
                                            ? 'text-yellow-400 fill-yellow-400' 
                                            : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                                {data.calificacion > 0 ? `${data.calificacion} estrellas` : "Sin calificar"}
                            </span>
                        </div>
                    </div>

                    {/* Imágenes adicionales */}
                    <div className="space-y-2">
                        <Label>Imágenes Adicionales (Máx. 4)</Label>
                        <div className="flex gap-2">
                            <Input
                                value={nuevaImagen}
                                onChange={(e) => setNuevaImagen(e.target.value)}
                                placeholder="https://ejemplo.com/imagen-extra.jpg"
                                type="url"
                            />
                            <Button 
                                type="button"
                                onClick={agregarImagenAdicional}
                                disabled={!nuevaImagen || data.imagenes_adicionales.length >= 4}
                            >
                                Agregar
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {data.imagenes_adicionales.map((imagen, index) => (
                                <div key={index} className="relative group">
                                    <img 
                                        src={imagen} 
                                        alt={`Imagen adicional ${index + 1}`}
                                        className="h-28 w-full object-cover border rounded-md"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => eliminarImagenAdicional(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.imagenes_adicionales && <p className="text-red-500 text-sm">{errors.imagenes_adicionales}</p>}
                    </div>
                </div>
            </div>

            {/* Sección de categorías y motos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* Categoría */}
                <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select
                        value={data.categoria_id}
                        onValueChange={(value) => setData('categoria_id', value)}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {categorias.map((categoria) => (
                                <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                    {categoria.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.categoria_id && <p className="text-red-500 text-sm">{errors.categoria_id}</p>}
                </div>

                {/* Subcategoría */}
                <div className="space-y-2">
                    <Label>Subcategoría</Label>
                    <Select
                        value={data.subcategoria_id}
                        onValueChange={(value) => setData('subcategoria_id', value)}
                        disabled={!data.categoria_id}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione una subcategoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {subcategorias.map((subcategoria) => (
                                <SelectItem key={subcategoria.id} value={subcategoria.id.toString()}>
                                    {subcategoria.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.subcategoria_id && <p className="text-red-500 text-sm">{errors.subcategoria_id}</p>}
                </div>

                {/* Moto compatible */}
                <div className="space-y-2">
                    <Label>Moto Compatible</Label>
                    <Select
                        value={data.moto_id}
                        onValueChange={(value) => setData('moto_id', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione una moto" />
                        </SelectTrigger>
                        <SelectContent>
                            {motos.map((moto) => (
                                <SelectItem key={moto.id} value={moto.id.toString()}>
                                    {`${moto.marca} ${moto.modelo} (${moto.año})`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.moto_id && <p className="text-red-500 text-sm">{errors.moto_id}</p>}
                </div>
            </div>

            {/* Botón de submit */}
            <div className="flex justify-end mt-8">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg"
                >
                    {processing ? 'Guardando...' : 'Guardar Producto'}
                </Button>
            </div>
        </form>
    );
};

export default AgregarProducto;