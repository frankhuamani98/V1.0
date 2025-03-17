import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import TodosUsuarios from '@/Layouts/Partials/Usuarios/TodosUsuarios';

// Definir las props que recibe el componente
interface TodosUsuariosPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const TodosUsuariosPage = ({ auth }: TodosUsuariosPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <TodosUsuarios />
        </DashboardLayout>
    );
};

export default TodosUsuariosPage;