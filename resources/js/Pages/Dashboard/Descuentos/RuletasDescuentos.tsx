import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import RuletasDescuentos from '@/Layouts/Partials/Descuentos/RuletasDescuentos';

// Definir las props que recibe el componente
interface RuletasDescuentosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const RuletasDescuentosPage = ({ auth }: RuletasDescuentosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <RuletasDescuentos />
        </DashboardLayout>
    );
};

export default RuletasDescuentosPage;