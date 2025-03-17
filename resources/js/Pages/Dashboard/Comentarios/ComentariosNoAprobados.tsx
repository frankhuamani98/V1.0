import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import ComentariosNoAprobados from '@/Layouts/Partials/Comentarios/ComentariosNoAprobados';

// Definir las props que recibe el componente
interface ComentariosNoAprobadosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const ComentariosNoAprobadosPage = ({ auth }: ComentariosNoAprobadosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <ComentariosNoAprobados />
        </DashboardLayout>
    );
};

export default ComentariosNoAprobadosPage;