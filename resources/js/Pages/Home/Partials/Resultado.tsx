import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Badge } from "@/Components/ui/badge";
import Header from '../Header'; // Make sure this path is correct
import Footer from '../Footer'; // Make sure this path is correct
import {
  StarIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  FilterIcon,
  HeartIcon,
  TruckIcon,
  CheckCircleIcon,
  InfoIcon,
  SearchIcon,
  PhoneIcon,
  MenuIcon,
  XIcon,
  PlusIcon // Icono para el botón de detalles
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";

// Mock data for related products
const mockProducts = [
  {
    id: 1,
    name: "Filtro de Aceite Premium",
    price: 24.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1635784063388-1ff609e4e0d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Filtros",
    compatibility: "Alta",
    stock: 15,
    discount: 0
  },
  {
    id: 2,
    name: "Kit de Pastillas de Freno",
    price: 39.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Frenos",
    compatibility: "Alta",
    stock: 8,
    discount: 10
  },
  {
    id: 3,
    name: "Aceite Sintético 10W-40",
    price: 32.50,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Lubricantes",
    compatibility: "Alta",
    stock: 20,
    discount: 0
  },
  {
    id: 4,
    name: "Bujías de Alto Rendimiento",
    price: 18.75,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1590766740616-0e8b8ac3ad6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Encendido",
    compatibility: "Media",
    stock: 12,
    discount: 0
  },
  {
    id: 5,
    name: "Cadena de Transmisión Reforzada",
    price: 89.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581026927481-8a1dc18b4091?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Transmisión",
    compatibility: "Alta",
    stock: 5,
    discount: 15
  },
  {
    id: 6,
    name: "Escape Deportivo",
    price: 249.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Escape",
    compatibility: "Media",
    stock: 3,
    discount: 0
  },
  {
    id: 7,
    name: "Kit de Embrague Completo",
    price: 129.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599256871679-6a3e7e036dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Transmisión",
    compatibility: "Alta",
    stock: 7,
    discount: 0
  },
  {
    id: 8,
    name: "Batería de Alto Rendimiento",
    price: 75.50,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Eléctrico",
    compatibility: "Alta",
    stock: 10,
    discount: 5
  }
];

const ProductCard = ({ product }: { product: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  const getCompatibilityColor = (compatibility: string) => {
    switch(compatibility) {
      case "Alta": return "bg-green-100 text-green-800";
      case "Media": return "bg-yellow-100 text-yellow-800";
      case "Baja": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleDetailsClick = () => {
    // Redirige a la ruta correcta definida en Laravel
    window.location.href = `/details/${product.id}`;
  };

  return (
    <Card
      className="res-card overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="res-image-container relative h-48 sm:h-40 md:h-48 lg:h-56 overflow-hidden bg-gray-100">
        {product.discount > 0 && (
          <div className="res-discount-badge absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {product.discount}% OFF
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`res-image w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {(isHovered || isMobile) && (
          <div className="res-favorite-button absolute top-2 right-2 z-10" style={{ opacity: isMobile ? 1 : undefined }}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white">
                    <HeartIcon size={16} className="text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Agregar a favoritos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      <CardContent className="res-card-content p-3 sm:p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="res-product-name font-semibold text-base sm:text-lg line-clamp-2">{product.name}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className={`res-compatibility-badge ${getCompatibilityColor(product.compatibility)} text-xs whitespace-nowrap ml-1`}>
                  {product.compatibility}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compatibilidad: {product.compatibility}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge variant="secondary" className="res-category-badge mb-2 text-xs">{product.category}</Badge>
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="res-price-container">
            {product.discount > 0 ? (
              <>
                <p className="res-discounted-price text-lg sm:text-xl font-bold">${discountedPrice.toFixed(2)}</p>
                <p className="res-original-price text-xs sm:text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="res-price text-lg sm:text-xl font-bold">${product.price.toFixed(2)}</p>
            )}
          </div>
          <div className="res-free-shipping flex items-center">
            <TruckIcon size={14} className="text-green-600 mr-1" />
            <span className="text-xs text-green-600">Envío gratis</span>
          </div>
        </div>
        <div className="res-stock-indicator mt-2 flex items-center">
          <CheckCircleIcon size={14} className={product.stock > 0 ? "text-green-600" : "text-red-500"} />
          <span className={`text-xs ml-1 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="res-card-footer p-3 sm:p-4 pt-0 flex flex-col gap-2">
        <Button className="w-full text-sm" disabled={product.stock === 0}>
          <ShoppingCartIcon size={16} className="mr-2" />
          Agregar
        </Button>
        <Button className="w-full text-sm" onClick={handleDetailsClick}>
          <PlusIcon size={16} className="mr-2" />
          Ver más detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

const Resultado = () => {
  const [data, setData] = useState({ year: "", brand: "", model: "" });
  const [activeTab, setActiveTab] = useState("todos");
  const [products, setProducts] = useState(mockProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // For demo purposes, set some default values if URL params are not available
    const params = new URLSearchParams(window.location.search);
    setData({
      year: params.get("year") || "2023",
      brand: params.get("brand") || "Honda",
      model: params.get("model") || "CBR 650R"
    });

    // In a real application, you would fetch products based on the search parameters
    // For now, we'll use our mock data
    setProducts(mockProducts);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const categories = ["Todos", "Filtros", "Frenos", "Lubricantes", "Encendido", "Transmisión", "Escape", "Eléctrico"];

  const filteredProducts = activeTab.toLowerCase() === "todos"
    ? products
    : products.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  if (!data.year || !data.brand || !data.model) {
    return (
      <div className="res-no-data max-w-lg mx-auto p-6 text-center">
        <h1 className="res-no-data-title text-2xl font-bold mb-4">No hay datos disponibles</h1>
        <p className="res-no-data-text text-gray-600">Por favor, realiza una búsqueda primero.</p>
        <Button className="res-no-data-button mt-4" onClick={() => (window.location.href = "/")}>
          <ArrowLeftIcon size={16} className="mr-2" />
          Volver al inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="resultado-page">
      <Header />

      <div className="res-container w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="res-header flex justify-between items-center mb-4 sm:mb-6">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="text-sm"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            Volver
          </Button>
          <h1 className="res-title text-xl sm:text-2xl md:text-3xl font-bold">Repuestos para tu Moto</h1>
        </div>

        <div className={`res-content ${isMobile ? 'mt-4' : ''}`}>
          <div className="res-info flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
            {!isMobile && (
              <div className="w-full md:w-auto">
                <h1 className="res-info-title text-xl sm:text-2xl md:text-3xl font-bold">Repuestos para tu Moto</h1>
                <p className="res-info-text text-gray-500 mt-2">Encontramos {products.length} productos compatibles con tu vehículo</p>
              </div>
            )}

            {isMobile ? (
              <div className="res-mobile-info w-full">
                <h1 className="res-mobile-info-title text-xl font-bold mb-2">Repuestos para tu Moto</h1>
                <p className="res-mobile-info-text text-gray-500 mb-3 text-sm">Encontramos {products.length} productos compatibles</p>
                <div className="res-mobile-info-details flex items-center justify-between mb-3">
                  <Badge variant="outline" className="res-mobile-info-badge bg-primary/10 text-primary text-xs">
                    {data.brand} {data.model} {data.year}
                  </Badge>
                  <Button variant="outline" size="sm" className="res-mobile-info-button h-8 gap-1 text-xs">
                    <FilterIcon size={14} />
                    Cambiar
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="res-vehicle-card w-full md:w-auto bg-gray-50 shadow-md border border-gray-200">
                <CardContent className="res-vehicle-card-content p-4 sm:p-6">
                  <div className="res-vehicle-card-header flex items-center gap-2 mb-3 sm:mb-4">
                    <Badge variant="outline" className="res-vehicle-card-badge bg-primary/10 text-primary">
                      Tu Vehículo
                    </Badge>
                    <Button variant="ghost" size="sm" className="res-vehicle-card-button h-7 gap-1">
                      <FilterIcon size={14} />
                      Cambiar
                    </Button>
                  </div>
                  <div className="res-vehicle-card-details grid grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Año</p>
                      <p className="font-semibold text-sm sm:text-base">{data.year}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Marca</p>
                      <p className="font-semibold text-sm sm:text-base">{data.brand}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Modelo</p>
                      <p className="font-semibold text-sm sm:text-base">{data.model}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="res-maintenance-package relative mb-4 sm:mb-6">
            <div className="res-maintenance-package-bg absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl"></div>
            <div className="res-maintenance-package-content relative p-3 sm:p-4 md:p-6 rounded-xl">
              <div className="res-maintenance-package-header flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="res-maintenance-package-title text-base sm:text-lg md:text-xl font-semibold mb-1">Paquete de Mantenimiento Recomendado</h2>
                  <p className="res-maintenance-package-text text-gray-600 text-xs sm:text-sm md:text-base">Basado en tu {data.brand} {data.model} {data.year}</p>
                </div>
                <Button className="res-maintenance-package-button w-full md:w-auto text-sm">Ver paquete completo</Button>
              </div>
            </div>
          </div>

          <Separator className="res-separator my-3 sm:my-4 md:my-6" />

          <div className="res-products mb-4 sm:mb-6 md:mb-8">
            <div className="res-products-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 md:mb-6 gap-3 sm:gap-4">
              <div className="res-products-header-title flex items-center">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mr-2">Productos Compatibles</h2>
                <Badge variant="outline" className="res-products-header-badge bg-green-100 text-green-800 text-xs">
                  100% Compatible
                </Badge>
              </div>

              {!isMobile && (
                <div className="res-products-header-search flex items-center gap-2 w-full sm:w-auto">
                  <div className="res-products-header-search-input relative w-full sm:w-64 md:w-80">
                    <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      className="res-products-header-search-input-field pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="res-products-header-search-button h-10 w-10"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <FilterIcon size={16} />
                  </Button>
                </div>
              )}
            </div>

            {isMobile && (
              <div className="res-products-header-mobile flex items-center gap-2 w-full mb-3 sm:mb-4">
                <div className="res-products-header-mobile-search relative flex-1">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="res-products-header-mobile-search-input pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="res-products-header-mobile-search-button h-10 w-10"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FilterIcon size={16} />
                </Button>
              </div>
            )}

            {isFilterOpen && (
              <Card className="res-filter-card mb-4 sm:mb-6 border border-gray-200">
                <CardContent className="res-filter-card-content p-3 sm:p-4">
                  <div className="res-filter-card-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Precio</label>
                      <select className="res-filter-card-select w-full rounded-md border border-gray-300 shadow-sm py-1.5 sm:py-2 px-3 bg-white focus:border-primary focus:ring focus:ring-primary/30 focus:ring-opacity-50 transition-colors text-sm">
                        <option>Todos los precios</option>
                        <option>Menos de $25</option>
                        <option>$25 - $50</option>
                        <option>$50 - $100</option>
                        <option>Más de $100</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Compatibilidad</label>
                      <select className="res-filter-card-select w-full rounded-md border border-gray-300 shadow-sm py-1.5 sm:py-2 px-3 bg-white focus:border-primary focus:ring focus:ring-primary/30 focus:ring-opacity-50 transition-colors text-sm">
                        <option>Todas</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Disponibilidad</label>
                      <select className="res-filter-card-select w-full rounded-md border border-gray-300 shadow-sm py-1.5 sm:py-2 px-3 bg-white focus:border-primary focus:ring focus:ring-primary/30 focus:ring-opacity-50 transition-colors text-sm">
                        <option>Todos</option>
                        <option>En stock</option>
                        <option>Ofertas</option>
                      </select>
                    </div>
                  </div>
                  <div className="res-filter-card-actions flex justify-end mt-3 sm:mt-4">
                    <Button variant="outline" size="sm" className="res-filter-card-clear mr-2 text-xs sm:text-sm">Limpiar</Button>
                    <Button size="sm" className="res-filter-card-apply text-xs sm:text-sm">Aplicar filtros</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isMobile && (
              <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="res-tabs-list overflow-x-auto pb-2">
                  <TabsList className="w-full sm:w-auto">
                    {categories.map(category => (
                      <TabsTrigger key={category.toLowerCase()} value={category.toLowerCase()} className="text-xs sm:text-sm">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map(category => (
                  <TabsContent key={category.toLowerCase()} value={category.toLowerCase()}>
                    <div className="res-products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {filteredProducts.length === 0 && (
                      <div className="res-no-products text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                        <InfoIcon size={isMobile ? 36 : 48} className="mx-auto text-gray-400 mb-3 sm:mb-4" />
                        <h3 className="res-no-products-title text-base sm:text-lg font-semibold mb-2">No se encontraron productos</h3>
                        <p className="res-no-products-text text-gray-500 text-sm mb-3 sm:mb-4">No hay productos disponibles en esta categoría para tu vehículo.</p>
                        <Button variant="outline" className="res-no-products-button text-sm">Ver todas las categorías</Button>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {isMobile && (
              <div>
                <div className="res-mobile-tabs overflow-x-auto pb-2 mb-3 sm:mb-4">
                  <div className="res-mobile-tabs-list flex space-x-2">
                    {categories.map(category => (
                      <Button
                        key={category.toLowerCase()}
                        variant={activeTab === category.toLowerCase() ? "default" : "outline"}
                        size="sm"
                        className="res-mobile-tabs-button whitespace-nowrap text-xs"
                        onClick={() => setActiveTab(category.toLowerCase())}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="res-mobile-products-grid grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="res-mobile-no-products text-center py-6 sm:py-8 bg-gray-50 rounded-lg">
                    <InfoIcon size={36} className="mx-auto text-gray-400 mb-3" />
                    <h3 className="res-mobile-no-products-title text-base font-semibold mb-2">No se encontraron productos</h3>
                    <p className="res-mobile-no-products-text text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">No hay productos disponibles en esta categoría para tu vehículo.</p>
                    <Button variant="outline" size="sm" className="res-mobile-no-products-button text-xs">Ver todas las categorías</Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <Card className="res-contact-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 mb-4 sm:mb-6 md:mb-8">
            <CardContent className="res-contact-card-content p-3 sm:p-4 md:p-6">
              <div className="res-contact-card-content-container flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <div className="res-contact-card-text flex-1">
                  <h3 className="res-contact-card-title text-base sm:text-lg md:text-xl font-semibold mb-2">¿No encuentras lo que buscas?</h3>
                  <p className="res-contact-card-text text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">Contamos con una amplia variedad de repuestos para tu {data.brand} {data.model} {data.year}. Contáctanos y te ayudaremos a encontrar exactamente lo que necesitas.</p>
                  <Button className="res-contact-card-button w-full md:w-auto gap-2 text-sm">
                    <PhoneIcon size={16} />
                    Contactar a un especialista
                  </Button>
                </div>
                <div className="res-contact-card-icon hidden md:flex w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-primary/20 rounded-full items-center justify-center">
                  <PhoneIcon size={isMobile ? 24 : isTablet ? 30 : 36} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resultado;
