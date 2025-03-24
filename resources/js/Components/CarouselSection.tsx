import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/Components/ui/carousel";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Separator } from "@/Components/ui/separator";
import { Progress } from "@/Components/ui/progress";
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  InfoIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  stock: number;
  description: string;
}

interface CarouselSectionProps {
  title: string;
  productList: Product[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ title, productList }) => {
  // ... (Mantén TODO el código original de tu componente CarouselSection aquí)
  // Solo asegúrate de que la interfaz Product esté definida como arriba

  return (
    <div>
      <h2>{title}</h2>
      <Carousel>
        {productList.map((product) => (
          <CarouselItem key={product.id}>
            <Card>
              <img src={product.image} alt={product.name} />
              <CardContent>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <Badge>{product.tag}</Badge>
                </p>
                <p>
                  <span>{product.price}</span>
                  <span>{product.originalPrice}</span>
                </p>
                <p>
                  <StarIcon /> {product.rating} ({product.reviews} reviews)
                </p>
              </CardContent>
              <CardFooter>
                <Button>
                  <ShoppingCartIcon /> Add to Cart
                </Button>
                <Button>
                  <HeartIcon /> Wishlist
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{product.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href={`/product/${product.id}`}>
                  <Button>
                    <ExternalLinkIcon /> View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSection;