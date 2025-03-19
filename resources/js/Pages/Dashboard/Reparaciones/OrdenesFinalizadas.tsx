import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import OrdenesFinalizadas from '@/Layouts/Partials/Reparaciones/OrdenesFinalizadas';

interface OrdenesFinalizadasPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const OrdenesFinalizadasPage = ({ auth }: OrdenesFinalizadasPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <OrdenesFinalizadas />
        </DashboardLayout>
    );
};

export default OrdenesFinalizadasPage;
