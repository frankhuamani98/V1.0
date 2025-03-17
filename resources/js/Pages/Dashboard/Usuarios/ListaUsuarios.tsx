import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import ListaUsuarios from '@/Layouts/Partials/Usuarios/ListaUsuarios';

// Definir las props que recibe el componente
interface ListaUsuariosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const ListaUsuariosPage = ({ auth }: ListaUsuariosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <ListaUsuarios />
        </DashboardLayout>
    );
};

export default ListaUsuariosPage;