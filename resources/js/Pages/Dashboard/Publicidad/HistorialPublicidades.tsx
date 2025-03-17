import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import HistorialPublicidades from '@/Layouts/Partials/Publicidad/HistorialPublicidades';

// Definir las props que recibe el componente
interface HistorialPublicidadesPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const HistorialPublicidadesPage = ({ auth }: HistorialPublicidadesPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <HistorialPublicidades />
        </DashboardLayout>
    );
};

export default HistorialPublicidadesPage;