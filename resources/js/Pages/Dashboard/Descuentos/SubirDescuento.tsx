import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SubirDescuento from '@/Layouts/Partials/Descuentos/SubirDescuento';

// Definir las props que recibe el componente
interface SubirDescuentoPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const SubirDescuentoPage = ({ auth }: SubirDescuentoPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <SubirDescuento />
        </DashboardLayout>
    );
};

export default SubirDescuentoPage;