import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

interface Moto {
    id: number;
    año: number;
    modelo: string;
    marca: string;
    estado: string;
}

interface RegistroMotosProps {
    motos: Moto[];
}

const RegistroMotos = ({ motos }: RegistroMotosProps) => {
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        id: null as number | null,
        año: '',
        modelo: '',
        marca: '',
        estado: 'Activo',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            // Si está en modo edición, actualiza la moto
            put(`/motos/registro/${data.id}`, {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            // Si no está en modo edición, crea una nueva moto
            post('/motos/registro', {
                onSuccess: () => {
                    resetForm();
                },
            });
        }
    };

    const handleEdit = (moto: Moto) => {
        setData({
            id: moto.id,
            año: moto.año.toString(),
            modelo: moto.modelo,
            marca: moto.marca,
            estado: moto.estado,
        });
        setIsEditing(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta moto?')) {
            destroy(`/motos/registro/${id}`, {
                onSuccess: () => {
                    resetForm();
                },
            });
        }
    };

    const resetForm = () => {
        setData({
            id: null,
            año: '',
            modelo: '',
            marca: '',
            estado: 'Activo',
        });
        setIsEditing(false);
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">
                    {isEditing ? 'Editar Moto' : 'Registrar Nueva Moto'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="año">Año</Label>
                        <Input
                            id="año"
                            type="number"
                            value={data.año}
                            onChange={(e) => setData('año', e.target.value)}
                            placeholder="Ingrese el año de la moto"
                            className="w-full"
                            required
                        />
                        {errors.año && <p className="text-sm text-red-500">{errors.año}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="modelo">Modelo</Label>
                        <Input
                            id="modelo"
                            value={data.modelo}
                            onChange={(e) => setData('modelo', e.target.value)}
                            placeholder="Ingrese el modelo de la moto"
                            className="w-full"
                            required
                        />
                        {errors.modelo && <p className="text-sm text-red-500">{errors.modelo}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="marca">Marca</Label>
                        <Input
                            id="marca"
                            value={data.marca}
                            onChange={(e) => setData('marca', e.target.value)}
                            placeholder="Ingrese la marca de la moto"
                            className="w-full"
                            required
                        />
                        {errors.marca && <p className="text-sm text-red-500">{errors.marca}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select
                            value={data.estado}
                            onValueChange={(value) => setData('estado', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione un estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Activo">Activo</SelectItem>
                                <SelectItem value="Inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
                    </div>
                    <Button type="submit" disabled={processing} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                        {processing ? (isEditing ? 'Actualizando...' : 'Registrando...') : (isEditing ? 'Actualizar Moto' : 'Registrar Moto')}
                    </Button>
                    {isEditing && (
                        <Button type="button" onClick={resetForm} className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 ml-2">
                            Cancelar Edición
                        </Button>
                    )}
                </form>

                {/* Mostrar la lista de motos */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Lista de Motos Registradas</h2>
                    <div className="space-y-4">
                        {motos.map((moto) => (
                            <div key={moto.id} className="p-4 border rounded-lg shadow-sm">
                                <p><strong>Año:</strong> {moto.año}</p>
                                <p><strong>Modelo:</strong> {moto.modelo}</p>
                                <p><strong>Marca:</strong> {moto.marca}</p>
                                <p><strong>Estado:</strong> {moto.estado}</p>
                                <div className="flex space-x-2 mt-2">
                                    <Button onClick={() => handleEdit(moto)} className="bg-yellow-500 hover:bg-yellow-600">
                                        Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(moto.id)} className="bg-red-500 hover:bg-red-600">
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegistroMotos;