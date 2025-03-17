import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

interface Categoria {
    id: number;
    nombre: string;
    estado: string;
    created_at: string;
    updated_at: string;
}

interface Subcategoria {
    id: number;
    nombre: string;
    categoria_id: number;
    estado: string;
    created_at: string;
    updated_at: string;
    categoria: {
        id: number;
        nombre: string;
    };
}

interface ListaCategoriasProps {
    categorias: Categoria[];
    subcategorias: Subcategoria[];
}

const ListaCategorias = ({ categorias, subcategorias }: ListaCategoriasProps) => {
    const [mostrarCategorias, setMostrarCategorias] = useState(true);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-4xl">
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    Lista de Categorías y Subcategorías
                </h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    Aquí puedes ver la lista completa de categorías y subcategorías.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                <Button
                    onClick={() => setMostrarCategorias(true)}
                    variant={mostrarCategorias ? 'default' : 'outline'}
                    className="w-full sm:w-auto"
                >
                    Ver Categorías Principales
                </Button>
                <Button
                    onClick={() => setMostrarCategorias(false)}
                    variant={!mostrarCategorias ? 'default' : 'outline'}
                    className="w-full sm:w-auto"
                >
                    Ver Subcategorías
                </Button>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                        {mostrarCategorias ? 'Categorías Principales' : 'Subcategorías'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 grid-cols-1">
                        {mostrarCategorias
                            ? categorias.map((categoria) => (
                                <div
                                    key={categoria.id}
                                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium text-lg">{categoria.nombre}</p>
                                        <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1.5 rounded-full">
                                            {categoria.estado}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground">
                                        Creado: {new Date(categoria.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                            : subcategorias.map((subcategoria) => (
                                <div
                                    key={subcategoria.id}
                                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="font-medium text-lg">
                                                {subcategoria.nombre}
                                            </p>
                                            <span className="text-sm text-muted-foreground">
                                                Categoría: {subcategoria.categoria.nombre}
                                            </span>
                                        </div>
                                        <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1.5 rounded-full">
                                            {subcategoria.estado}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground">
                                        Creado: {new Date(subcategoria.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ListaCategorias;