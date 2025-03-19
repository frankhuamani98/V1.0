import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import HistorialReparaciones from '@/Layouts/Partials/Reparaciones/HistorialReparaciones';

interface HistorialReparacionesPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const HistorialReparacionesPage = ({ auth }: HistorialReparacionesPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <HistorialReparaciones />
        </DashboardLayout>
    );
};

export default HistorialReparacionesPage;
