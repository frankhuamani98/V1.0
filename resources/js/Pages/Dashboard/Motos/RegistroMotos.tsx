import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import RegistroMotos from '@/Layouts/Partials/Motos/RegistroMotos';

// Definir las props que recibe el componente
interface RegistroMotosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const RegistroMotosPage = ({ auth }: RegistroMotosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <RegistroMotos />
        </DashboardLayout>
    );
};

export default RegistroMotosPage;