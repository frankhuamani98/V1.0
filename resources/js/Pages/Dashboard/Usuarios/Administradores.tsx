import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Administradores from '@/Layouts/Partials/Usuarios/Administradores';

// Definir las props que recibe el componente
interface AdministradoresPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const AdministradoresPage = ({ auth }: AdministradoresPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <Administradores />
        </DashboardLayout>
    );
};

export default AdministradoresPage;