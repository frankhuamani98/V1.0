import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Button } from "@/Components/ui/button"
import {
  X,
  Star,
  Check,
  Plus,
  Minus,
  Truck,
  Percent,
  Layers,
  ShoppingCart,
  Award,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Switch } from "@/Components/ui/switch"
import { useForm, router } from "@inertiajs/react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Separator } from "@/Components/ui/separator"
import { route } from "ziggy-js"
import { cn } from "@/lib/utils"

interface Categoria {
  id: number
  nombre: string
  subcategorias: Subcategoria[]
}

interface Subcategoria {
  id: number
  nombre: string
}

interface Moto {
  id: number
  año: number
  modelo: string
  marca: string
  estado: string
}

interface ImagenAdicional {
  url: string
  estilo: string
}

interface AgregarProductoProps {
  categorias: Categoria[]
  motos: Moto[]
}

// Funciones de ayuda para formato de moneda
const formatCurrencyInput = (value: string): string => {
  if (!value) return ""

  const numericValue = value.replace(/[^0-9.]/g, "")
  const parts = numericValue.split(".")
  let integerPart = parts[0] || "0"
  const decimalPart = parts.length > 1 ? `.${parts[1].substring(0, 2)}` : ""

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return `${integerPart}${decimalPart}`
}

const parseCurrencyInput = (value: string): string => {
  return value.replace(/,/g, "")
}

const formatCurrencyDisplay = (value: number): string => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

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
    imagenes_adicionales: JSON.stringify([] as ImagenAdicional[]),
    calificacion: 0,
    incluye_igv: false,
    stock: 0,
    destacado: false,
    mas_vendido: false,
  })

  const [nuevaImagen, setNuevaImagen] = useState({
    url: "",
    estilo: "",
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([])
  const [showStockInput, setShowStockInput] = useState(false)
  const [tempStock, setTempStock] = useState("0")
  const [activeTab, setActiveTab] = useState("informacion")
  const [progress, setProgress] = useState(1)
  const totalSteps = 4

  // Calcular precios
  const { precioSinIGV, precioConIGV, precioTotal } = useMemo(() => {
    const precioBase = Number.parseFloat(parseCurrencyInput(data.precio)) || 0
    const descuento = Number.parseFloat(data.descuento) || 0
    const IGV_PERCENT = 18

    let precioConDescuento = precioBase
    if (descuento > 0 && descuento < 100) {
      precioConDescuento = precioBase - (precioBase * descuento) / 100
    } else if (descuento >= 100) {
      precioConDescuento = 0
    }

    if (data.incluye_igv) {
      const precioSinIGV = precioConDescuento / (1 + IGV_PERCENT / 100)
      return {
        precioSinIGV: precioSinIGV,
        precioConIGV: precioConDescuento,
        precioTotal: precioConDescuento,
      }
    } else {
      const igv = precioConDescuento * (IGV_PERCENT / 100)
      return {
        precioSinIGV: precioConDescuento,
        precioConIGV: precioConDescuento + igv,
        precioTotal: precioConDescuento + igv,
      }
    }
  }, [data.precio, data.descuento, data.incluye_igv])

  useEffect(() => {
    if (data.categoria_id) {
      const categoriaSeleccionada = categorias.find((cat) => cat.id.toString() === data.categoria_id)
      setSubcategorias(categoriaSeleccionada?.subcategorias || [])
      setData("subcategoria_id", "")
    }
  }, [data.categoria_id, categorias])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setData(name as keyof typeof data, type === "checkbox" ? ((checked ?? false) as false) : (value as string | number))
  }

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
    setData("precio", rawValue)
  }

  const agregarImagenAdicional = () => {
    const imagenesActuales = JSON.parse(data.imagenes_adicionales) as ImagenAdicional[]
    if (nuevaImagen.url && imagenesActuales.length < 6) {
      setData(
        "imagenes_adicionales",
        JSON.stringify([...imagenesActuales, { url: nuevaImagen.url, estilo: nuevaImagen.estilo }]),
      )
      setNuevaImagen({ url: "", estilo: "" })
    }
  }

  const eliminarImagenAdicional = (index: number) => {
    setData(
      "imagenes_adicionales",
      JSON.stringify(JSON.parse(data.imagenes_adicionales).filter((_: ImagenAdicional, i: number) => i !== index)),
    )
  }

  const handleRatingClick = (rating: number) => {
    setData("calificacion", rating)
  }

  const handleStockChange = () => {
    const stockValue = Number.parseInt(tempStock) || 0
    setData("stock", stockValue)
    setShowStockInput(false)
  }

  const incrementStock = () => {
    setData("stock", data.stock + 1)
  }

  const decrementStock = () => {
    setData("stock", Math.max(0, data.stock - 1))
  }

  const nextStep = () => {
    if (activeTab === "informacion") {
      setActiveTab("precios")
      setProgress(2)
    } else if (activeTab === "precios") {
      setActiveTab("imagenes")
      setProgress(3)
    } else if (activeTab === "imagenes") {
      setActiveTab("categorias")
      setProgress(4)
    }
  }

  const prevStep = () => {
    if (activeTab === "precios") {
      setActiveTab("informacion")
      setProgress(1)
    } else if (activeTab === "imagenes") {
      setActiveTab("precios")
      setProgress(2)
    } else if (activeTab === "categorias") {
      setActiveTab("imagenes")
      setProgress(3)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      ...data,
      precio: parseCurrencyInput(data.precio),
      imagenes_adicionales: JSON.parse(data.imagenes_adicionales), // Asegúrate de que sea un array
    }

    router.post(route("productos.store"), formData, {
      onSuccess: () => {
        toast.success("Producto creado exitosamente")
        reset()
        setActiveTab("informacion")
        setProgress(1)
      },
      onError: (errors) => {
        toast.error("Error al crear el producto")
        console.error(errors)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-7xl mx-auto p-2 sm:p-4 space-y-6">
      <Card className="border-none shadow-xl overflow-hidden bg-white rounded-xl">
        <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-t-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Agregar Nuevo Producto
              </CardTitle>
              <CardDescription className="text-purple-100 mt-1 text-sm sm:text-base">
                Complete los detalles del producto para agregarlo al catálogo
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {data.destacado && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Award className="h-3.5 w-3.5 mr-1" />
                  Destacado
                </Badge>
              )}
              {data.mas_vendido && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  Más Vendido
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-medium text-purple-100">Progreso</span>
              <span className="text-xs font-medium text-purple-100">
                {progress}/{totalSteps}
              </span>
            </div>
            <div className="w-full bg-purple-800/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-white h-2.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(progress / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              if (value === "informacion") setProgress(1)
              else if (value === "precios") setProgress(2)
              else if (value === "imagenes") setProgress(3)
              else if (value === "categorias") setProgress(4)
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="informacion"
                className={cn(
                  "flex items-center justify-center sm:justify-start gap-2 transition-all",
                  activeTab === "informacion" ? "bg-white shadow-sm" : "",
                )}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  1
                </div>
                <span className="hidden sm:inline">Información</span>
              </TabsTrigger>
              <TabsTrigger
                value="precios"
                className={cn(
                  "flex items-center justify-center sm:justify-start gap-2 transition-all",
                  activeTab === "precios" ? "bg-white shadow-sm" : "",
                )}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  2
                </div>
                <span className="hidden sm:inline">Precios</span>
              </TabsTrigger>
              <TabsTrigger
                value="imagenes"
                className={cn(
                  "flex items-center justify-center sm:justify-start gap-2 transition-all",
                  activeTab === "imagenes" ? "bg-white shadow-sm" : "",
                )}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  3
                </div>
                <span className="hidden sm:inline">Imágenes</span>
              </TabsTrigger>
              <TabsTrigger
                value="categorias"
                className={cn(
                  "flex items-center justify-center sm:justify-start gap-2 transition-all",
                  activeTab === "categorias" ? "bg-white shadow-sm" : "",
                )}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  4
                </div>
                <span className="hidden sm:inline">Categorías</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="informacion" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="codigo" className="text-sm font-medium flex items-center">
                        Código del Producto
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="codigo"
                        name="codigo"
                        value={data.codigo}
                        onChange={handleInputChange}
                        placeholder="Ej: PROD-001"
                        className="h-10 transition-all focus-visible:ring-indigo-500"
                        required
                      />
                      {errors.codigo && <p className="text-red-500 text-xs mt-1">{errors.codigo}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-sm font-medium flex items-center">
                        Nombre del Producto
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={data.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej: Filtro de Aire XYZ"
                        className="h-10 transition-all focus-visible:ring-indigo-500"
                        required
                      />
                      {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion_corta" className="text-sm font-medium flex items-center">
                      Descripción Corta
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="descripcion_corta"
                      name="descripcion_corta"
                      value={data.descripcion_corta}
                      onChange={handleInputChange}
                      placeholder="Breve descripción del producto (máx. 150 caracteres)"
                      rows={3}
                      className="resize-none transition-all focus-visible:ring-indigo-500"
                      required
                    />
                    {errors.descripcion_corta && (
                      <p className="text-red-500 text-xs mt-1">{errors.descripcion_corta}</p>
                    )}
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">{data.descripcion_corta.length}/150 caracteres</p>
                      {data.descripcion_corta.length > 150 && (
                        <p className="text-xs text-red-500">Excede el límite de caracteres</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detalles" className="text-sm font-medium">
                      Detalles del Producto
                    </Label>
                    <Textarea
                      id="detalles"
                      name="detalles"
                      value={data.detalles}
                      onChange={handleInputChange}
                      placeholder="Especificaciones técnicas, materiales, etc."
                      rows={5}
                      className="transition-all focus-visible:ring-indigo-500"
                    />
                    {errors.detalles && <p className="text-red-500 text-xs mt-1">{errors.detalles}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Calificación del Producto</Label>
                    <div className="flex items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-7 w-7 sm:h-8 sm:w-8 ${
                              (hoverRating || data.calificacion) >= star
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm text-gray-600 font-medium">
                        {data.calificacion > 0 ? `${data.calificacion} estrellas` : "Sin calificar"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 space-y-3 border border-indigo-100">
                      <h3 className="font-medium text-sm flex items-center gap-2 text-indigo-700">
                        <Award className="h-4 w-4 text-indigo-600" />
                        Opciones de Producto
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 p-3 border rounded-md bg-white shadow-sm hover:shadow transition-shadow">
                          <Switch
                            id="destacado"
                            checked={data.destacado}
                            onCheckedChange={(checked: boolean) => setData("destacado", checked as false)}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                          <Label htmlFor="destacado" className="cursor-pointer flex-1">
                            Producto Destacado
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md bg-white shadow-sm hover:shadow transition-shadow">
                          <Switch
                            id="mas_vendido"
                            checked={data.mas_vendido}
                            onCheckedChange={(checked: boolean) => setData("mas_vendido", checked as false)}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                          <Label htmlFor="mas_vendido" className="cursor-pointer flex-1">
                            Más Vendido
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 sm:px-8 rounded-md min-w-[140px] sm:min-w-[180px] transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Siguiente
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="precios" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="precio" className="text-sm font-medium flex items-center">
                        Precio (S/.)
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">S/.</span>
                        <Input
                          id="precio"
                          name="precio"
                          value={formatCurrencyInput(data.precio)}
                          onChange={handlePrecioChange}
                          onBlur={(e) => {
                            const value = Number.parseFloat(parseCurrencyInput(e.target.value)) || 0
                            setData("precio", value.toString())
                          }}
                          placeholder="0.00"
                          className="pl-10 h-10 transition-all focus-visible:ring-indigo-500"
                          required
                        />
                      </div>
                      {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descuento" className="text-sm font-medium flex items-center">
                        Descuento (%)
                      </Label>
                      <div className="relative">
                        <Input
                          id="descuento"
                          name="descuento"
                          type="number"
                          value={data.descuento}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          max="100"
                          className="h-10 pr-8 transition-all focus-visible:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                      </div>
                      {errors.descuento && <p className="text-red-500 text-xs mt-1">{errors.descuento}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Incluye IGV (18%)</Label>
                      <Switch
                        id="incluye_igv"
                        checked={data.incluye_igv}
                        onCheckedChange={(checked: boolean) => setData("incluye_igv", checked as false)}
                        className="data-[state=checked]:bg-indigo-600"
                      />
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg space-y-2 border border-indigo-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Precio sin IGV:</span>
                        <span className="font-medium">{formatCurrencyDisplay(precioSinIGV)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">IGV (18%):</span>
                        <span className="font-medium">{formatCurrencyDisplay(precioConIGV - precioSinIGV)}</span>
                      </div>
                      <Separator className="my-2 bg-indigo-200/50" />
                      <div className="flex justify-between">
                        <span className="text-gray-800 font-semibold">Precio Total:</span>
                        <span className="font-bold text-lg text-indigo-700">{formatCurrencyDisplay(precioTotal)}</span>
                      </div>
                      {Number(data.descuento) > 0 && (
                        <div className="text-sm text-green-600 mt-1 flex items-center">
                          <Percent className="h-3.5 w-3.5 mr-1" />
                          Descuento del {data.descuento}% aplicado
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Stock Disponible</Label>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                      {showStockInput ? (
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={tempStock}
                            onChange={(e) => setTempStock(e.target.value)}
                            min="0"
                            className="flex-1 h-10 transition-all focus-visible:ring-indigo-500"
                          />
                          <Button
                            size="sm"
                            onClick={handleStockChange}
                            type="button"
                            className="h-10 bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Aplicar
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={decrementStock}
                            disabled={data.stock <= 0}
                            type="button"
                            className="h-10 w-10 rounded-full border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div
                            className="px-6 py-2 border border-indigo-200 rounded-md cursor-pointer hover:bg-white text-center min-w-[100px] font-medium text-lg transition-colors"
                            onClick={() => {
                              setTempStock(data.stock.toString())
                              setShowStockInput(true)
                            }}
                          >
                            {data.stock}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={incrementStock}
                            type="button"
                            className="h-10 w-10 rounded-full border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <div className="text-center mt-3 text-sm text-gray-600 flex items-center justify-center">
                        <Truck className="h-4 w-4 mr-1 text-indigo-600" />
                        {data.stock > 0 ? `${data.stock} unidades disponibles` : "Sin stock"}
                      </div>
                    </div>
                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 sm:px-8 rounded-md min-w-[140px] sm:min-w-[180px] transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Siguiente
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="imagenes" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="imagen_principal" className="text-sm font-medium flex items-center">
                      Imagen Principal (URL)
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="imagen_principal"
                      name="imagen_principal"
                      value={data.imagen_principal}
                      onChange={handleInputChange}
                      placeholder="https://ejemplo.com/imagen-producto.jpg"
                      type="url"
                      className="h-10 transition-all focus-visible:ring-indigo-500"
                      required
                    />
                    {errors.imagen_principal && <p className="text-red-500 text-xs mt-1">{errors.imagen_principal}</p>}
                  </div>

                  {data.imagen_principal && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                      <p className="text-sm text-indigo-700 mb-2 font-medium">Vista previa:</p>
                      <div className="relative aspect-square w-full bg-white rounded-md overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                        <img
                          src={data.imagen_principal || "/placeholder.svg"}
                          alt="Vista previa imagen principal"
                          className="h-full w-full object-contain p-2"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              "https://placehold.co/400x400/f3f4f6/a3a3a3?text=Imagen+no+disponible"
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Imágenes Adicionales (Máx. 6)</Label>

                    {/* Input para URL */}
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={nuevaImagen.url}
                        onChange={(e) => setNuevaImagen({ ...nuevaImagen, url: e.target.value })}
                        placeholder="https://ejemplo.com/imagen-extra.jpg"
                        type="url"
                        className="h-10 transition-all focus-visible:ring-indigo-500 flex-1"
                      />
                    </div>

                    {/* Input para Estilo */}
                    {nuevaImagen.url && (
                      <div className="flex gap-2">
                        <Input
                          value={nuevaImagen.estilo}
                          onChange={(e) => setNuevaImagen({ ...nuevaImagen, estilo: e.target.value })}
                          placeholder="Ej: Color Rojo, Variante A, etc."
                          className="h-10 transition-all focus-visible:ring-indigo-500 flex-1"
                        />
                        <Button
                          type="button"
                          onClick={agregarImagenAdicional}
                          disabled={!nuevaImagen.url || JSON.parse(data.imagenes_adicionales).length >= 6}
                          className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    )}

                    {/* Lista de imágenes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {JSON.parse(data.imagenes_adicionales).map((imagen: ImagenAdicional, index: number) => (
                        <div
                          key={index}
                          className="relative group bg-white border rounded-md p-2 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-50 mb-2">
                            <img
                              src={imagen.url || "/placeholder.svg"}
                              alt={`Imagen ${index + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                                (e.currentTarget.src = "https://placehold.co/400x400?text=Error+Imagen")
                              }
                            />
                          </div>
                          {imagen.estilo && (
                            <Badge variant="outline" className="w-full text-center truncate">
                              {imagen.estilo}
                            </Badge>
                          )}
                          <button
                            type="button"
                            onClick={() => eliminarImagenAdicional(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {errors.imagenes_adicionales && (
                      <p className="text-red-500 text-xs mt-1">{errors.imagenes_adicionales}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {JSON.parse(data.imagenes_adicionales).length}/6 imágenes adicionales
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 sm:px-8 rounded-md min-w-[140px] sm:min-w-[180px] transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Siguiente
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="categorias" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="shadow-md hover:shadow-lg transition-shadow border border-indigo-100">
                  <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                    <CardTitle className="text-lg flex items-center gap-2 text-indigo-700">
                      <Layers className="h-5 w-5 text-indigo-600" />
                      Categoría
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Select
                      value={data.categoria_id}
                      onValueChange={(value) => setData("categoria_id", value)}
                      required
                    >
                      <SelectTrigger className="h-10 transition-all focus-visible:ring-indigo-500">
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
                    {errors.categoria_id && <p className="text-red-500 text-xs mt-2">{errors.categoria_id}</p>}
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow border border-indigo-100">
                  <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                    <CardTitle className="text-lg flex items-center gap-2 text-indigo-700">
                      <Layers className="h-5 w-5 text-indigo-600" />
                      Subcategoría
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Select
                      value={data.subcategoria_id}
                      onValueChange={(value) => setData("subcategoria_id", value)}
                      disabled={!data.categoria_id}
                      required
                    >
                      <SelectTrigger className="h-10 transition-all focus-visible:ring-indigo-500">
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
                    {errors.subcategoria_id && <p className="text-red-500 text-xs mt-2">{errors.subcategoria_id}</p>}
                    {!data.categoria_id && (
                      <p className="text-xs text-muted-foreground mt-2">Seleccione primero una categoría</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow border border-indigo-100">
                  <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                    <CardTitle className="text-lg flex items-center gap-2 text-indigo-700">
                      <ShoppingCart className="h-5 w-5 text-indigo-600" />
                      Moto Compatible
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Select value={data.moto_id} onValueChange={(value) => setData("moto_id", value)}>
                      <SelectTrigger className="h-10 transition-all focus-visible:ring-indigo-500">
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
                    {errors.moto_id && <p className="text-red-500 text-xs mt-2">{errors.moto_id}</p>}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Anterior
                </Button>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2 px-6 sm:px-8 rounded-md min-w-[140px] sm:min-w-[180px] transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {processing ? (
                    "Guardando..."
                  ) : (
                    <>
                      Guardar Producto
                      <Check className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row sm:justify-between border-t p-4 sm:p-6 bg-gray-50 rounded-b-xl gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Nota:</span> Todos los campos marcados con{" "}
            <span className="text-red-500">*</span> son requeridos.
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={() => reset()}
            disabled={processing}
            className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default AgregarProducto

