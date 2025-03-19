import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import OrdenesProceso from '@/Layouts/Partials/Reparaciones/OrdenesProceso';

// Definir las props que recibe el componente
interface OrdenesProcesoPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const OrdenesProcesoPage = ({ auth }: OrdenesProcesoPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <OrdenesProceso />
        </DashboardLayout>
    );
};

export default OrdenesProcesoPage;
