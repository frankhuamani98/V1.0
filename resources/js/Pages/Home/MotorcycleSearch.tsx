import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Badge } from "@/Components/ui/badge";
import { toast } from "sonner";
import {
  SearchIcon,
  BikeIcon,
  FilterIcon,
  StarIcon,
  ChevronRightIcon,
  SparklesIcon,
  ZapIcon,
  ShieldCheckIcon,
  ClockIcon,
  ThumbsUpIcon,
  ShoppingCartIcon
} from "lucide-react";

// Datos
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);
const brands = [
  { value: "honda", label: "Honda", popular: true },
  { value: "yamaha", label: "Yamaha", popular: true },
  { value: "suzuki", label: "Suzuki", popular: true },
  { value: "kawasaki", label: "Kawasaki", popular: true },
  { value: "bmw", label: "BMW", popular: false },
  { value: "ducati", label: "Ducati", popular: false },
  { value: "ktm", label: "KTM", popular: false },
  { value: "aprilia", label: "Aprilia", popular: false },
  { value: "triumph", label: "Triumph", popular: false },
  { value: "harley", label: "Harley-Davidson", popular: true },
  { value: "indian", label: "Indian", popular: false },
  { value: "royal-enfield", label: "Royal Enfield", popular: false }
];

const models = [
  { value: "cbr600rr", label: "CBR 600RR", brand: "honda", type: "deportiva", featured: true },
  { value: "cb500f", label: "CB 500F", brand: "honda", type: "naked" },
  { value: "africa-twin", label: "Africa Twin", brand: "honda", type: "adventure", featured: true },
  { value: "r1", label: "YZF-R1", brand: "yamaha", type: "deportiva", featured: true },
  { value: "mt-09", label: "MT-09", brand: "yamaha", type: "naked", featured: true },
  { value: "tenere-700", label: "Ténéré 700", brand: "yamaha", type: "adventure" },
  { value: "gsxr750", label: "GSX-R750", brand: "suzuki", type: "deportiva" },
  { value: "sv650", label: "SV650", brand: "suzuki", type: "naked" },
  { value: "v-strom-650", label: "V-Strom 650", brand: "suzuki", type: "adventure" },
  { value: "zx10r", label: "Ninja ZX-10R", brand: "kawasaki", type: "deportiva", featured: true },
  { value: "z900", label: "Z900", brand: "kawasaki", type: "naked" },
  { value: "versys-650", label: "Versys 650", brand: "kawasaki", type: "adventure" },
  { value: "s1000rr", label: "S 1000 RR", brand: "bmw", type: "deportiva", featured: true },
  { value: "r1250gs", label: "R 1250 GS", brand: "bmw", type: "adventure", featured: true },
  { value: "panigalev4", label: "Panigale V4", brand: "ducati", type: "deportiva", featured: true },
  { value: "monster", label: "Monster", brand: "ducati", type: "naked" },
  { value: "sportster", label: "Sportster", brand: "harley", type: "cruiser", featured: true },
  { value: "street-glide", label: "Street Glide", brand: "harley", type: "touring" }
];

const categories = [
  { name: "Frenos", icon: <ZapIcon className="h-4 w-4" />, count: 428 },
  { name: "Neumáticos", icon: <ShieldCheckIcon className="h-4 w-4" />, count: 356 },
  { name: "Aceite", icon: <SparklesIcon className="h-4 w-4" />, count: 231 },
  { name: "....", icon: <ThumbsUpIcon className="h-4 w-4" />, count: 198 }
];

export default function MotorcycleSearch() {
  const [year, setYear] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [filteredModels, setFilteredModels] = useState(models);
  const [searchMode, setSearchMode] = useState<"standard" | "advanced">("standard");
  const [recentSearches, setRecentSearches] = useState<Array<{year: string, brand: string, model: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [promoTime, setPromoTime] = useState({ hours: 12, minutes: 43, seconds: 21 });

  // Recuperar búsquedas recientes del localStorage al cargar el componente
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentMotorcycleSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 3));
    }

    // Mostrar toast de bienvenida después de 1.5 segundos
    const timeout = setTimeout(() => {
      toast.success("¡Bienvenido motociclista!", {
        description: "Tu taller de confianza para reparaciones y repuestos de motos. ¡Más de 10 años de experiencia! 🏍️",
        duration: 5000
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  // Contador en tiempo real para la promoción
  useEffect(() => {
    const savedTime = localStorage.getItem("promoTime");
    if (savedTime) {
      const { hours, minutes, seconds } = JSON.parse(savedTime);
      setPromoTime({ hours, minutes, seconds });
    }

    const interval = setInterval(() => {
      setPromoTime((prevTime) => {
        const totalSeconds = prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(interval);
          localStorage.removeItem("promoTime");
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        localStorage.setItem("promoTime", JSON.stringify({ hours: newHours, minutes: newMinutes, seconds: newSeconds }));
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel("");
    setFilteredModels(models.filter(m => m.brand === value));
  };

  const saveSearch = () => {
    // Solo guardar búsquedas completas
    if (year && brand && model) {
      const brandName = brands.find(b => b.value === brand)?.label || "";
      const modelName = models.find(m => m.value === model)?.label || "";

      const newSearch = { year, brand: brandName, model: modelName };
      const updatedSearches = [newSearch, ...recentSearches.filter(
        s => !(s.year === year && s.brand === brandName && s.model === modelName)
      )].slice(0, 3);

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentMotorcycleSearches", JSON.stringify(updatedSearches));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !brand || !model) {
      toast.error("¡Espera un momento!", {
        description: "Necesitamos saber qué moto tienes para mostrarte las partes perfectas."
      });
      return;
    }

    setLoading(true);
    saveSearch();

    toast.success("¡En camino a toda velocidad!", {
      description: `Buscando las mejores partes para tu ${brands.find(b => b.value === brand)?.label} ${models.find(m => m.value === model)?.label} ${year}`
    });

    // Simulación de carga antes de redirigir
    setTimeout(() => {
      window.location.href = route("resultado", { year, brand, model });
    }, 800);
  };

  const handleQuickSearch = (search: {year: string, brand: string, model: string}) => {
    const brandValue = brands.find(b => b.label === search.brand)?.value || "";
    const modelValue = models.find(m => m.label === search.model)?.value || "";

    setLoading(true);
    toast.success("¡Búsqueda instantánea!", {
      description: `Localizando piezas premium para tu ${search.brand} ${search.model} ${search.year}`
    });

    setTimeout(() => {
      window.location.href = route("resultado", {
        year: search.year,
        brand: brandValue,
        model: modelValue
      });
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Hero Section - Más impactante */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 py-16 text-center text-white relative overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            ¡TU TALLER DE CONFIANZA!
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium">
            Reparaciones y repuestos de calidad para tu moto.
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium mt-2">
            Más de 10 años brindando servicios de reparación y mantenimiento.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Badge className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 text-sm border border-white/40">
              <SparklesIcon className="h-4 w-4 mr-1" />
              +3,000 Productos
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 text-sm border border-white/40">
              <ThumbsUpIcon className="h-4 w-4 mr-1" />
              98% Satisfacción
            </Badge>
          </div>

          {/* Countdown Timer */}
          <div className="mt-6 bg-black/30 max-w-md mx-auto rounded-lg p-3 border border-white/20">
            <p className="text-yellow-300 font-semibold text-sm mb-1">¡OFERTA FLASH HOY!</p>
            <div className="flex justify-center gap-3">
              <div className="bg-white/10 rounded px-3 py-1">
                <span className="font-mono text-xl">{promoTime.hours}</span>
                <span className="text-xs block">Horas</span>
              </div>
              <div className="bg-white/10 rounded px-3 py-1">
                <span className="font-mono text-xl">{promoTime.minutes}</span>
                <span className="text-xs block">Min</span>
              </div>
              <div className="bg-white/10 rounded px-3 py-1">
                <span className="font-mono text-xl">{promoTime.seconds}</span>
                <span className="text-xs block">Seg</span>
              </div>
            </div>
            <p className="text-white/80 text-xs mt-1">Hasta 30%  en partes seleccionadas</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Promo Banner - Solo se muestra si showPromo es true */}
        {showPromo && (
          <Card className="border-2 border-yellow-400 mb-6 overflow-hidden bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-yellow-400 rounded-full p-2 mr-3">
                  <ZapIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">¡CÓDIGO DE DESCUENTO: MOTO25!</h3>
                  <p className="text-sm">25% de descuento en tu primera compra. ¡Solo por tiempo limitado!</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0"
                onClick={() => setShowPromo(false)}
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search Card - Más llamativa */}
        <Card className="border-none rounded-xl shadow-xl overflow-hidden relative -mt-10 z-10 bg-white dark:bg-gray-900">
          <CardContent className="p-0">
            <Tabs defaultValue="standard" className="w-full">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b">
                <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                  <TabsTrigger value="standard" onClick={() => setSearchMode("standard")}>
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Búsqueda Rápida
                  </TabsTrigger>
                  <TabsTrigger value="advanced" onClick={() => setSearchMode("advanced")}>
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Búsqueda Avanzada
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="standard" className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <BikeIcon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-800">
                    ¡ENCUENTRA TUS PARTES EN SEGUNDOS!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto">
                    Dinos qué moto tienes y te mostraremos <span className="font-semibold">exactamente</span> lo que necesitas
                  </p>
                </div>

                <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Year Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="year" className="font-medium text-sm flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1 text-blue-500" />
                        Año de tu Moto
                      </Label>
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger id="year" className="w-full">
                          <SelectValue placeholder="Selecciona Año" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {years.map(y => (
                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Brand Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="brand" className="font-medium text-sm flex items-center">
                        <StarIcon className="h-4 w-4 mr-1 text-blue-500" />
                        Marca Preferida
                      </Label>
                      <Select value={brand} onValueChange={handleBrandChange}>
                        <SelectTrigger id="brand" className="w-full">
                          <SelectValue placeholder="Selecciona Marca" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <div className="p-2 border-b">
                            <span className="text-xs font-medium text-muted-foreground">Marcas Populares</span>
                          </div>
                          {brands.filter(b => b.popular).map(b => (
                            <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                          ))}
                          <div className="p-2 border-b mt-2">
                            <span className="text-xs font-medium text-muted-foreground">Otras Marcas</span>
                          </div>
                          {brands.filter(b => !b.popular).map(b => (
                            <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Model Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="model" className="font-medium text-sm flex items-center">
                        <BikeIcon className="h-4 w-4 mr-1 text-blue-500" />
                        Modelo Exacto
                      </Label>
                      <Select value={model} onValueChange={setModel} disabled={!brand}>
                        <SelectTrigger id="model" className="w-full">
                          <SelectValue placeholder={brand ? "Selecciona Modelo" : "Primero selecciona una marca"} />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {filteredModels.map(m => (
                            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Search Button - Más atractivo */}
                  <div className="text-center mt-8">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-red-800 hover:from-blue-700 hover:to-red-900 text-white px-10 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Buscando...</span>
                        </div>
                      ) : (
                        <>
                          <ShoppingCartIcon className="h-5 w-5 mr-2" />
                          ¡ENCONTRAR MIS PARTES AHORA!
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Recent Searches - Más visual */}
                {recentSearches.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-px bg-gray-200 dark:bg-gray-700 flex-grow max-w-xs"></div>
                      <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mx-3 dark:bg-blue-900 dark:text-blue-100">Tus búsquedas recientes</span>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 flex-grow max-w-xs"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleQuickSearch(search)}
                          className="flex justify-between items-center hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <span className="truncate mr-2 flex items-center">
                            <ClockIcon className="h-3 w-3 mr-2 text-gray-400" />
                            {search.brand} {search.model} {search.year}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-blue-500" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="advanced" className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <FilterIcon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-800">
                    PERSONALIZA TU BÚSQUEDA AL DETALLE
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto">
                    Refina tu búsqueda para encontrar exactamente lo que necesitas
                  </p>
                </div>

                {/* Categorías populares */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Categorías populares</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="h-auto py-3 justify-between hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3 dark:bg-blue-900/30">
                            {category.icon}
                          </div>
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2">{category.count}</Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    ¡Próximamente más filtros avanzados!
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}