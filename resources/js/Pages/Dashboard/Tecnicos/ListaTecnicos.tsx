import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import ListaTecnicos from '@/Layouts/Partials/Tecnicos/ListaTecnicos';

interface ListaTecnicosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const ListaTecnicosPage = ({ auth }: ListaTecnicosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <ListaTecnicos />
        </DashboardLayout>
    );
};

export default ListaTecnicosPage;
