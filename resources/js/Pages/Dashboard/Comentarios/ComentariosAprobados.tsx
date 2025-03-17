import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import ComentariosAprobados from '@/Layouts/Partials/Comentarios/ComentariosAprobados';

// Definir las props que recibe el componente
interface ComentariosAprobadosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const ComentariosAprobadosPage = ({ auth }: ComentariosAprobadosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <ComentariosAprobados />
        </DashboardLayout>
    );
};

export default ComentariosAprobadosPage;