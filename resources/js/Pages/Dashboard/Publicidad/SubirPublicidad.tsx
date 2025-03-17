import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SubirPublicidad from '@/Layouts/Partials/Publicidad/SubirPublicidad';

// Definir las props que recibe el componente
interface SubirPublicidadPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const SubirPublicidadPage = ({ auth }: SubirPublicidadPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <SubirPublicidad />
        </DashboardLayout>
    );
};

export default SubirPublicidadPage;