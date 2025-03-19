import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import HistorialTecnicos from '@/Layouts/Partials/Tecnicos/HistorialTecnicos';

interface HistorialTecnicosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const HistorialTecnicosPage = ({ auth }: HistorialTecnicosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <HistorialTecnicos />
        </DashboardLayout>
    );
};

export default HistorialTecnicosPage;
