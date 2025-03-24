import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Header from "./Home/Header";
import MotorcycleSearch from "./Home/MotorcycleSearch";
import Products from "./Home/Productos";

interface WelcomeProps extends PageProps {
    featuredProducts: any[];
    bestSellingProducts: any[];
    allProducts: any[];
}

export default function Welcome({
    featuredProducts,
    bestSellingProducts,
    allProducts
}: WelcomeProps) {
    return (
        <>
            <Head title="Inicio" />
            <Header />
            <MotorcycleSearch />
            <Products 
                featuredProducts={featuredProducts}
                bestSellingProducts={bestSellingProducts}
                allProducts={allProducts}
            />
        </>
    );
}