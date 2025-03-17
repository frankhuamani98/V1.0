import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AgregarProducto from '@/Layouts/Partials/Productos/AgregarProducto';

// Definir las props que recibe el componente
interface AgregarProductoPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const AgregarProductoPage = ({ auth }: AgregarProductoPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <AgregarProducto />
        </DashboardLayout>
    );
};

export default AgregarProductoPage;