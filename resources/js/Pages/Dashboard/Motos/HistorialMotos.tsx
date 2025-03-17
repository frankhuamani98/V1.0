import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import HistorialMotos from '@/Layouts/Partials/Motos/HistorialMotos';

// Definir las props que recibe el componente
interface HistorialMotosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const HistorialMotosPage = ({ auth }: HistorialMotosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <HistorialMotos />
        </DashboardLayout>
    );
};

export default HistorialMotosPage;