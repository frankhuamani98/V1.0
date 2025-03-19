import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AsignarReparaciones from '@/Layouts/Partials/Tecnicos/AsignarReparaciones';

interface AsignarReparacionesPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const AsignarReparacionesPage = ({ auth }: AsignarReparacionesPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <AsignarReparaciones />
        </DashboardLayout>
    );
};

export default AsignarReparacionesPage;
